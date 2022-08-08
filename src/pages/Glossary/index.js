import _ from 'lodash';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import {
  Body,
  DescendingClockIcon,
  AscendingClockIcon,
  SearchInput,
  H3,
} from '../../components';
import { getFileList } from '../../store/actions/climateWarehouseActions';

const StyledSectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledHeaderContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 24px 30px 16px;
`;

const StyledBodyContainer = styled('div')`
  flex-grow: 1;
  overflow: scroll;
`;

const StyledBodyNoDataFound = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledTable = styled('table')`
  width: 100%;
`;

const StyledTh = styled('th')`
  text-align: start;
  padding: 17px;
  background-color: ${props =>
    props.theme.colors.default.status.info.secondary};
  position: sticky;
  top: 0;
`;

const StyledTd = styled('td')`
  text-align: start;
  padding: 17px;
`;

const StyledTr = styled('tr')`
  :nth-child(even) {
    background-color: ${props => props.theme.colors.default.background};
  }
`;

const StyledSortButtonContainer = styled.div`
  margin-left: 10px;
  border: 0.0625rem solid #d9d9d9;
  height: 2.5rem;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  min-width: 200px;
  cursor: pointer;
`;

const StyledIconContainer = styled('div')`
  color: ${props => props.theme.colors.default.primary};
  cursor: pointer;
`;

const SortEnum = {
  aToZ: 'aToZ',
  zToA: 'zToA',
};

const Glossary = () => {
  const dispatch = useDispatch();
  const { fileList } = useSelector(store => store.climateWarehouse);
  const [filteredFileList, setFilteredFileList] = useState(fileList ?? []);
  const [sortOrder, setSortOrder] = useState(SortEnum.aToZ);

  useEffect(() => dispatch(getFileList()), []);
  useEffect(() => setFilteredFileList(fileList), [fileList]);

  const onSearch = useMemo(
    () =>
      _.debounce(event => {
        if (event.target.value !== '') {
          setFilteredFileList(
            fileList.filter(file =>
              file.fileName
                .toLowerCase()
                .includes(event.target.value.toLowerCase()),
            ),
          );
        } else {
          setFilteredFileList(fileList);
        }
      }, 300),
    [fileList],
  );

  useEffect(() => {
    return () => {
      onSearch.cancel();
    };
  }, []);

  const getArraySortedAlphabetically = useCallback((arr, order) => {
    const sortAToZ = (a, b) => a.fileName.localeCompare(b.fileName);
    const sortZToA = (a, b) => b.fileName.localeCompare(a.fileName);
    const sortFunction = order === SortEnum.aToZ ? sortAToZ : sortZToA;
    return [...arr].sort(sortFunction);
  }, []);

  const changeSortOrder = useCallback(() => {
    setSortOrder(prevOrder => {
      const newOrder =
        prevOrder === SortEnum.aToZ ? SortEnum.zToA : SortEnum.aToZ;
      setFilteredFileList(
        getArraySortedAlphabetically(filteredFileList, newOrder),
      );
      return newOrder;
    });
  }, [setSortOrder, filteredFileList]);

  if (!fileList) {
    return null;
  }

  return (
    <StyledSectionContainer>
      <StyledHeaderContainer>
        <SearchInput size="large" onChange={onSearch} outline />

        <StyledSortButtonContainer onClick={changeSortOrder}>
          {sortOrder === SortEnum.aToZ ? (
            <>
              <Body>
                <FormattedMessage id="sort-z-to-a" />
              </Body>
              <StyledIconContainer>
                <AscendingClockIcon width={'1.5em'} height={'1.5em'} />
              </StyledIconContainer>
            </>
          ) : (
            <>
              <Body>
                <FormattedMessage id="sort-a-to-z" />
              </Body>
              <StyledIconContainer>
                <DescendingClockIcon width={'1.5em'} height={'1.5em'} />
              </StyledIconContainer>
            </>
          )}
        </StyledSortButtonContainer>
      </StyledHeaderContainer>
      {filteredFileList?.length === 0 && (
        <StyledBodyNoDataFound>
          <H3>
            <FormattedMessage id="no-glossary-terms-found" />
          </H3>
        </StyledBodyNoDataFound>
      )}
      {filteredFileList?.length > 0 && (
        <StyledBodyContainer>
          <StyledTable>
            <thead>
              <StyledTr>
                <StyledTh>
                  <Body size="Bold">
                    <FormattedMessage id="term" />
                  </Body>
                </StyledTh>
                <StyledTh>
                  <Body size="Bold">
                    <FormattedMessage id="description" />
                  </Body>
                </StyledTh>
              </StyledTr>
            </thead>
            <tbody>
              {filteredFileList.map(file => (
                <StyledTr key={file.SHA256}>
                  <StyledTd>
                    <Body>{file.fileName}</Body>
                  </StyledTd>
                  <StyledTd>
                    <Body>{file.SHA256}</Body>
                  </StyledTd>
                </StyledTr>
              ))}
            </tbody>
          </StyledTable>
        </StyledBodyContainer>
      )}
    </StyledSectionContainer>
  );
};

export { Glossary };

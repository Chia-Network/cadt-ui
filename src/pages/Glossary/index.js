import _ from 'lodash';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Body, SearchInput, H3, AZIcon, ZAIcon } from '../../components';
import { getGlossary } from '../../store/actions/climateWarehouseActions';

const StyledSectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
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
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
`;

const StyledTh = styled('th')`
  text-align: start;
  padding: 17px;
  background-color: ${props => props.theme.colors.default.shade4};
  position: sticky;
  top: 0;
`;

const StyledTd = styled('td')`
  text-align: start;
  padding: 17px;
`;

const StyledTr = styled('tr')`
  :nth-child(even) {
    background-color: ${props => props.theme.colors.default.shade6};
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

const DescriptionContainer = styled('div')`
  margin-bottom: 0.9375rem;
`;

const SortEnum = {
  aToZ: 'aToZ',
  zToA: 'zToA',
};

const Glossary = () => {
  const dispatch = useDispatch();
  const { glossary } = useSelector(store => store.climateWarehouse);
  const [filteredFileList, setFilteredFileList] = useState(glossary ?? []);
  const [sortOrder, setSortOrder] = useState(SortEnum.aToZ);

  useEffect(() => dispatch(getGlossary()), []);
  useEffect(() => setFilteredFileList(glossary), [glossary]);

  const onSearch = useMemo(
    () =>
      _.debounce(event => {
        if (event.target.value !== '') {
          setFilteredFileList(
            Object.fromEntries(
              Object.entries(glossary).filter(value => {
                if (
                  _.includes(
                    value[0].toLowerCase(),
                    event.target.value.toLowerCase(),
                  )
                ) {
                  return _.includes(
                    value[0].toLowerCase(),
                    event.target.value.toLowerCase(),
                  );
                } else {
                  const descriptionSearch = value[1].filter(description =>
                    _.includes(
                      description.toLowerCase(),
                      event.target.value.toLowerCase(),
                    ),
                  );

                  return !_.isEmpty(descriptionSearch);
                }
              }),
            ),
          );
        } else {
          setFilteredFileList(glossary);
        }
      }, 300),
    [glossary],
  );

  useEffect(() => {
    return () => {
      onSearch.cancel();
    };
  }, []);

  const getArraySortedAlphabetically = useCallback(order => {
    const sortAToZ = object =>
      Object.fromEntries(
        Object.entries(object).sort(([k1], [k2]) => (k1 < k2 ? -1 : 1)),
      );
    const sortZToA = object =>
      Object.fromEntries(
        Object.entries(object).sort(([k1], [k2]) => (k1 > k2 ? -1 : 1)),
      );
    const sortFunction = order === SortEnum.aToZ ? sortAToZ : sortZToA;
    return sortFunction;
  }, []);

  const changeSortOrder = useCallback(() => {
    setSortOrder(prevOrder => {
      const newOrder =
        prevOrder === SortEnum.aToZ ? SortEnum.zToA : SortEnum.aToZ;
      setFilteredFileList(getArraySortedAlphabetically(newOrder));
      return newOrder;
    });
  }, [setSortOrder, filteredFileList]);

  if (!glossary) {
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
                <ZAIcon />
              </StyledIconContainer>
            </>
          ) : (
            <>
              <Body>
                <FormattedMessage id="sort-a-to-z" />
              </Body>
              <StyledIconContainer>
                <AZIcon />
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
      {filteredFileList && (
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
              {Object.entries(filteredFileList).map((file, index) => (
                <StyledTr key={index}>
                  <StyledTd>
                    <Body>{file[0]}</Body>
                  </StyledTd>
                  <StyledTd>
                    {file[1].map((term, index) => (
                      <DescriptionContainer key={index}>
                        <Body size="Bold">{term.split(';')[0]}</Body>
                        <Body>{term.split(';')[1]}</Body>
                      </DescriptionContainer>
                    ))}
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

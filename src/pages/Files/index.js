import _ from 'lodash';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';

import constants from '../../constants';
import {
  Body,
  SearchInput,
  H3,
  DownloadIcon,
  UploadIcon,
  FileUploadModal,
  RemoveIcon,
  Modal,
  modalTypeEnum,
  SelectSizeEnum,
  SelectTypeEnum,
  SelectOrganizations,
  AZIcon,
  ZAIcon,
} from '../../components';
import {
  getFileList,
  deleteFile,
} from '../../store/actions/climateWarehouseActions';

const StyledUploadIconContainer = styled('div')`
  margin-left: auto;
  cursor: pointer;
`;

const StyledSectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledHeaderContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: start;
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

const StyledCenteredChildren = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSortButtonContainer = styled.div`
  margin: 0 10px;
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

const Files = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { fileList, organizations } = useSelector(
    store => store.climateWarehouse,
  );
  const [filteredFileList, setFilteredFileList] = useState(fileList ?? []);
  const [selectedOrgUid, setSelectedOrgUid] = useState(null);
  const [fileNameFilter, setFileNameFilter] = useState(null);
  const [sortOrder, setSortOrder] = useState(SortEnum.aToZ);
  const [fileToDownload, setFileToDownload] = useState(null);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [fileToDelete, setFileToDelete] = useState();

  useEffect(() => dispatch(getFileList()), []);
  useEffect(() => setFilteredFileList(fileList), [fileList]);

  const onSearch = useMemo(
    () =>
      _.debounce(event => {
        setFileNameFilter(event.target.value?.toLowerCase() ?? '');
      }, 300),
    [fileList],
  );

  useEffect(() => {
    return () => {
      onSearch.cancel();
    };
  }, []);

  const onOrganizationSelect = useCallback(
    selectedOption => {
      const orgUid = selectedOption[0]?.orgUid;
      if (orgUid) {
        setSelectedOrgUid(orgUid);
      }
    },
    [organizations],
  );

  useEffect(() => {
    if (fileList) {
      setFilteredFileList(
        fileList.filter(file => {
          if (
            fileNameFilter &&
            !file.fileName.toLowerCase().includes(fileNameFilter)
          ) {
            return false;
          }

          if (selectedOrgUid && selectedOrgUid !== file.orgUid) {
            return false;
          }

          return true;
        }),
      );
    }
  }, [selectedOrgUid, fileList, fileNameFilter]);

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

  const downloadFile = useCallback(async () => {
    await fetch(`${constants.API_HOST}/filestore/get_file`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileId: fileToDownload.SHA256 }),
    })
      .then(async result => await result.blob())
      .then(async response => {
        const filename = await response;
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(new Blob([filename]));
        link.href = url;
        link.download = `${fileToDownload.fileName}`;
        document.body.appendChild(link); // Required for this to work in FireFox
        link.click();
      });
  }, [fileToDownload]);

  useEffect(() => {
    if (fileToDownload) {
      downloadFile();
    }
    setFileToDownload(null);
  }, [fileToDownload]);

  const toggleUploadModal = useCallback(
    () => setIsUploadModalVisible(prev => !prev),
    [setIsUploadModalVisible],
  );

  if (!fileList || !organizations) {
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

        <SelectOrganizations
          size={SelectSizeEnum.large}
          type={SelectTypeEnum.basic}
          placeholder={intl.formatMessage({ id: 'select-organization' })}
          width="200px"
          onChange={onOrganizationSelect}
        />
        <StyledUploadIconContainer>
          <UploadIcon width="20" height="20" onClick={toggleUploadModal} />
        </StyledUploadIconContainer>
      </StyledHeaderContainer>
      {filteredFileList?.length === 0 && (
        <StyledBodyNoDataFound>
          <H3>
            <FormattedMessage id="no-files-found" />
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
                    <StyledCenteredChildren>
                      <FormattedMessage id="delete" />
                    </StyledCenteredChildren>
                  </Body>
                </StyledTh>
                <StyledTh>
                  <Body size="Bold">
                    <StyledCenteredChildren>
                      <FormattedMessage id="download" />
                    </StyledCenteredChildren>
                  </Body>
                </StyledTh>
                <StyledTh>
                  <Body size="Bold">
                    <FormattedMessage id="filename" />
                  </Body>
                </StyledTh>
                <StyledTh>
                  <Body size="Bold">SHA256</Body>
                </StyledTh>
                <StyledTh>
                  <Body size="Bold">
                    <FormattedMessage id="organization-name" />
                  </Body>
                </StyledTh>
              </StyledTr>
            </thead>
            <tbody>
              {filteredFileList.map(file => (
                <StyledTr key={file.SHA256}>
                  <StyledTd>
                    <StyledCenteredChildren>
                      <StyledIconContainer
                        onClick={() => setFileToDelete(file)}
                      >
                        <RemoveIcon width={20} height={20} />
                      </StyledIconContainer>
                    </StyledCenteredChildren>
                  </StyledTd>
                  <StyledTd>
                    <StyledCenteredChildren>
                      <StyledIconContainer
                        onClick={() => setFileToDownload(file)}
                      >
                        <DownloadIcon width={20} height={20} />
                      </StyledIconContainer>
                    </StyledCenteredChildren>
                  </StyledTd>
                  <StyledTd>
                    <Body>{file.fileName}</Body>
                  </StyledTd>
                  <StyledTd>
                    <Body>{file.SHA256}</Body>
                  </StyledTd>
                  <StyledTd>
                    <Body>{organizations[file.orgUid]?.name}</Body>
                  </StyledTd>
                </StyledTr>
              ))}
            </tbody>
          </StyledTable>
        </StyledBodyContainer>
      )}
      {isUploadModalVisible && <FileUploadModal onClose={toggleUploadModal} />}
      {fileToDelete && (
        <Modal
          title={intl.formatMessage({
            id: 'confirm-file-deletion',
          })}
          body={fileToDelete.fileName}
          label={intl.formatMessage({
            id: 'delete',
          })}
          modalType={modalTypeEnum.confirmation}
          onClose={() => setFileToDelete(null)}
          onOk={() => {
            dispatch(deleteFile(fileToDelete.SHA256));
            setFileToDelete(null);
          }}
        />
      )}
    </StyledSectionContainer>
  );
};

export { Files };

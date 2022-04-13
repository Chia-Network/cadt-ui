import _ from 'lodash';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { downloadTxtFile } from '../../utils/xlsxUtils';
import constants from '../../constants';
import { getUpdatedUrl } from '../../utils/urlUtils';
import { useWindowSize } from '../../components/hooks/useWindowSize';

import {
  APIDataTable,
  AddIcon,
  SearchInput,
  PrimaryButton,
  StagingDataGroups,
  Tab,
  Tabs,
  TabPanel,
  DownloadIcon,
  SelectOrganizations,
  SelectSizeEnum,
  SelectTypeEnum,
  CreateProjectForm,
  H3,
  UploadXLSX,
  Modal,
  modalTypeEnum,
  Body,
} from '../../components';
import {
  setPendingError,
  setValidateForm,
  setForm,
} from '../../store/actions/app';

import {
  deleteStagingData,
  commitStagingData,
  getPaginatedData,
  getStagingPaginatedData,
  retryStagingData,
} from '../../store/actions/climateWarehouseActions';

import { setCommit } from '../../store/actions/app';

const headings = [
  'currentRegistry',
  'warehouseProjectId',
  'projectId',
  'registryOfOrigin',
  'program',
  'projectName',
  'projectLink',
  'projectDeveloper',
  'sector',
  'projectType',
  'projectTags',
  'coveredByNDC',
  'ndcInformation',
  'projectStatus',
  'projectStatusDate',
  'unitMetric',
  'methodology',
  'validationBody',
  'validationDate',
];

const StyledSectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledHeaderContainer = styled('div')`
  display: flex;
  align-items: center;
  padding: 30px 24px 14px 16px;
`;

const StyledSearchContainer = styled('div')`
  max-width: 25.1875rem;
`;

const StyledFiltersContainer = styled('div')`
  margin: 0rem 1.2813rem;
`;

const StyledButtonContainer = styled('div')`
  margin-left: auto;
`;

const StyledSubHeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 27.23px;
`;

const StyledBodyContainer = styled('div')`
  flex-grow: 1;
`;

const StyledCreateOneNowContainer = styled('div')`
  margin-left: 0.3125rem;
  display: inline-block;
  cursor: pointer;
  color: #1890ff;
`;

const NoDataMessageContainer = styled('div')`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledCSVOperationsContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const Projects = withRouter(() => {
  const [createFormIsDisplayed, setCreateFormIsDisplayed] = useState(false);
  const { notification, commit } = useSelector(store => store.app);
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);
  const [tabValue, setTabValue] = useState(0);
  const intl = useIntl();
  const dispatch = useDispatch();
  let history = useHistory();
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  let searchParams = new URLSearchParams(history.location.search);
  const projectsContainerRef = useRef(null);
  const [modalSizeAndPosition, setModalSizeAndPosition] = useState(null);
  const windowSize = useWindowSize();
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const switchTabBySuccessfulRequest = {
      'project-deleted': 1,
      'project-successfully-created': 1,
      'project-successfully-edited': 1,
      'transactions-committed': 2,
      'transactions-staged': 1,
    };
    if (switchTabBySuccessfulRequest[notification?.id]) {
      setTabValue(switchTabBySuccessfulRequest[notification.id]);
    }
  }, [notification]);

  useEffect(() => {
    setTabValue(0);
  }, [searchParams.get('orgUid')]);

  useEffect(() => {
    if (projectsContainerRef && projectsContainerRef.current) {
      setModalSizeAndPosition({
        left: projectsContainerRef.current.getBoundingClientRect().x,
        top: projectsContainerRef.current.getBoundingClientRect().y,
        width: projectsContainerRef.current.getBoundingClientRect().width,
        height: projectsContainerRef.current.getBoundingClientRect().height,
      });
    }
  }, [
    projectsContainerRef,
    projectsContainerRef.current,
    windowSize.height,
    windowSize.width,
  ]);

  const pageIsMyRegistryPage =
    searchParams.has('myRegistry') && searchParams.get('myRegistry') === 'true';

  const onOrganizationSelect = selectedOption => {
    const orgUid = selectedOption[0].orgUid;
    setSelectedOrganization(orgUid);
    history.replace({
      search: getUpdatedUrl(window.location.search, {
        param: 'orgUid',
        value: orgUid,
      }),
    });
  };

  const onSearch = useMemo(
    () =>
      _.debounce(event => {
        if (event.target.value !== '') {
          history.replace({
            search: getUpdatedUrl(window.location.search, {
              param: 'search',
              value: event.target.value,
            }),
          });
        } else {
          history.replace({
            search: getUpdatedUrl(window.location.search, {
              param: 'search',
              value: null,
            }),
          });
        }
        setSearchQuery(event.target.value);
      }, 300),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      onSearch.cancel();
    };
  }, []);

  useEffect(() => {
    const options = {
      type: 'projects',
      page: 1,
      resultsLimit: constants.MAX_TABLE_SIZE,
    };
    if (searchQuery) {
      options.searchQuery = searchQuery;
    }
    if (selectedOrganization && selectedOrganization !== 'all') {
      options.orgUid = selectedOrganization;
    }
    if (pageIsMyRegistryPage) {
      options.orgUid = searchParams.get('orgUid');
    }
    dispatch(getPaginatedData(options));
  }, [
    dispatch,
    tabValue,
    searchQuery,
    selectedOrganization,
    pageIsMyRegistryPage,
  ]);

  useEffect(() => {
    const options = {
      type: 'staging',
      page: 1,
      resultsLimit: 1,
    };
    dispatch(getStagingPaginatedData(options));
  }, [dispatch]);

  const filteredColumnsTableData = useMemo(() => {
    if (!climateWarehouseStore.projects) {
      return null;
    }

    return climateWarehouseStore.projects.map(project =>
      _.pick(project, [
        'warehouseProjectId',
        'currentRegistry',
        'projectId',
        'projectName',
        'projectDeveloper',
        'sector',
        'projectType',
        'projectTags',
        'coveredByNDC',
        'projectStatus',
        'unitMetric',
        'validationBody',
      ]),
    );
  }, [climateWarehouseStore.projects, climateWarehouseStore.stagingData]);

  if (!filteredColumnsTableData) {
    return null;
  }

  const onCommit = () => {
    dispatch(commitStagingData('Projects'));
    dispatch(setCommit(false));
  };

  const onCommitAll = () => {
    dispatch(commitStagingData('all'));
    dispatch(setCommit(false));
  };

  return (
    <>
      <StyledSectionContainer ref={projectsContainerRef}>
        <StyledHeaderContainer>
          <StyledSearchContainer>
            <SearchInput
              size="large"
              onChange={onSearch}
              disabled={tabValue !== 0}
              outline
            />
          </StyledSearchContainer>
          {tabValue === 0 && !pageIsMyRegistryPage && (
            <StyledFiltersContainer>
              <SelectOrganizations
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                placeholder={intl.formatMessage({ id: 'filters' })}
                width="200px"
                onChange={onOrganizationSelect}
                displayAllOrganizations
              />
            </StyledFiltersContainer>
          )}
          <StyledButtonContainer>
            {tabValue === 0 && pageIsMyRegistryPage && (
              <PrimaryButton
                label={intl.formatMessage({ id: 'create' })}
                size="large"
                icon={<AddIcon width="16.13" height="16.88" fill="#ffffff" />}
                onClick={() => {
                  if (
                    _.isEmpty(
                      climateWarehouseStore.stagingData.units.pending,
                    ) &&
                    _.isEmpty(
                      climateWarehouseStore.stagingData.projects.pending,
                    )
                  ) {
                    setCreateFormIsDisplayed(true);
                    dispatch(setForm('project'));
                    dispatch(setValidateForm(false));
                  } else {
                    dispatch(setPendingError(true));
                  }
                }}
              />
            )}
            {tabValue === 1 &&
              climateWarehouseStore.stagingData.projects.staging.length > 0 && (
                <PrimaryButton
                  label={intl.formatMessage({ id: 'commit' })}
                  size="large"
                  onClick={() => dispatch(setCommit(true))}
                />
              )}
          </StyledButtonContainer>
        </StyledHeaderContainer>
        {commit && (
          <Modal
            title={intl.formatMessage({ id: 'commit-message' })}
            body={
              <Body size="Large">
                {intl.formatMessage({
                  id: 'commit-projects-message-question',
                })}
              </Body>
            }
            modalType={modalTypeEnum.basic}
            extraButtonLabel={intl.formatMessage({ id: 'everything' })}
            extraButtonOnClick={onCommitAll}
            onClose={() => dispatch(setCommit(false))}
            onOk={onCommit}
            label={intl.formatMessage({ id: 'only-projects' })}
          />
        )}
        <StyledSubHeaderContainer>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={intl.formatMessage({ id: 'committed' })} />
            {pageIsMyRegistryPage && (
              <Tab
                label={`${intl.formatMessage({ id: 'staging' })} (${
                  climateWarehouseStore.stagingData &&
                  climateWarehouseStore.stagingData.projects.staging.length
                })`}
              />
            )}
            {pageIsMyRegistryPage && (
              <Tab
                label={`${intl.formatMessage({ id: 'pending' })} (${
                  climateWarehouseStore.stagingData &&
                  climateWarehouseStore.stagingData.projects.pending.length
                })`}
              />
            )}
            {pageIsMyRegistryPage && (
              <Tab
                label={`${intl.formatMessage({ id: 'failed' })} (${
                  climateWarehouseStore.stagingData &&
                  climateWarehouseStore.stagingData.projects.failed.length
                })`}
              />
            )}
          </Tabs>
          <StyledCSVOperationsContainer>
            <span onClick={() => downloadTxtFile('projects', searchParams)}>
              <DownloadIcon />
            </span>
            {pageIsMyRegistryPage && (
              <span>
                <UploadXLSX type="projects" />
              </span>
            )}
          </StyledCSVOperationsContainer>
        </StyledSubHeaderContainer>
        <StyledBodyContainer>
          <TabPanel value={tabValue} index={0}>
            {climateWarehouseStore.projects &&
              climateWarehouseStore.projects.length === 0 && (
                <NoDataMessageContainer>
                  <H3>
                    {!searchQuery && pageIsMyRegistryPage && (
                      <>
                        <FormattedMessage id="no-projects-created" />
                        <StyledCreateOneNowContainer
                          onClick={() => {
                            if (
                              _.isEmpty(
                                climateWarehouseStore.stagingData.units.pending,
                              ) &&
                              _.isEmpty(
                                climateWarehouseStore.stagingData.projects
                                  .pending,
                              )
                            ) {
                              setCreateFormIsDisplayed(true);
                              dispatch(setForm('project'));
                              dispatch(setValidateForm(false));
                            } else {
                              dispatch(setPendingError(true));
                            }
                          }}>
                          <FormattedMessage id="create-one-now" />
                        </StyledCreateOneNowContainer>
                      </>
                    )}
                    {!searchQuery && !pageIsMyRegistryPage && (
                      <FormattedMessage id="no-search-results" />
                    )}
                    {searchQuery && <FormattedMessage id="no-search-results" />}
                  </H3>
                </NoDataMessageContainer>
              )}
            {climateWarehouseStore.projects &&
              climateWarehouseStore.projects.length > 0 && (
                <APIDataTable
                  headings={Object.keys(filteredColumnsTableData[0])}
                  data={filteredColumnsTableData}
                  actions={'Projects'}
                  modalSizeAndPosition={modalSizeAndPosition}
                  actionsAreDisplayed={pageIsMyRegistryPage}
                />
              )}
          </TabPanel>
          {pageIsMyRegistryPage && (
            <>
              <TabPanel value={tabValue} index={1}>
                {climateWarehouseStore.stagingData &&
                  climateWarehouseStore.stagingData.projects.staging.length ===
                    0 && (
                    <NoDataMessageContainer>
                      <H3>
                        <FormattedMessage id="no-staged" />
                      </H3>
                    </NoDataMessageContainer>
                  )}
                {climateWarehouseStore.stagingData && (
                  <StagingDataGroups
                    headings={headings}
                    data={climateWarehouseStore.stagingData.projects.staging}
                    deleteStagingData={uuid =>
                      dispatch(deleteStagingData(uuid))
                    }
                    modalSizeAndPosition={modalSizeAndPosition}
                  />
                )}
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                {climateWarehouseStore.stagingData &&
                  climateWarehouseStore.stagingData.projects.pending.length ===
                    0 && (
                    <NoDataMessageContainer>
                      <H3>
                        <FormattedMessage id="no-pending" />
                      </H3>
                    </NoDataMessageContainer>
                  )}
                {climateWarehouseStore.stagingData && (
                  <StagingDataGroups
                    headings={headings}
                    data={climateWarehouseStore.stagingData.projects.pending}
                    modalSizeAndPosition={modalSizeAndPosition}
                  />
                )}
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                {climateWarehouseStore.stagingData &&
                  climateWarehouseStore.stagingData.projects.failed.length ===
                    0 && (
                    <NoDataMessageContainer>
                      <H3>
                        <FormattedMessage id="no-failed" />
                      </H3>
                    </NoDataMessageContainer>
                  )}
                {climateWarehouseStore.stagingData && (
                  <StagingDataGroups
                    headings={headings}
                    data={climateWarehouseStore.stagingData.projects.failed}
                    deleteStagingData={uuid =>
                      dispatch(deleteStagingData(uuid))
                    }
                    retryStagingData={uuid => dispatch(retryStagingData(uuid))}
                    modalSizeAndPosition={modalSizeAndPosition}
                  />
                )}
              </TabPanel>
            </>
          )}
        </StyledBodyContainer>
      </StyledSectionContainer>
      {createFormIsDisplayed && (
        <CreateProjectForm
          onClose={() => {
            setCreateFormIsDisplayed(false);
            dispatch(setForm(null));
            dispatch(setValidateForm(false));
          }}
          modalSizeAndPosition={modalSizeAndPosition}
        />
      )}
    </>
  );
});

export { Projects };

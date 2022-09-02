/* es-lint disable */
import _ from 'lodash';
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
  ProjectCreateModal,
  H3,
  UploadXLSX,
  CommitModal,
  Modal,
  modalTypeEnum,
  RemoveIcon,
  ProjectDetailedViewModal,
} from '../../components';

import { setPendingError } from '../../store/actions/app';

import {
  deleteStagingData,
  getPaginatedData,
  getStagingPaginatedData,
  retryStagingData,
  getStagingData,
  deleteAllStagingData,
  clearProjectData,
  getProjectData,
  cancelTransferOffer,
} from '../../store/actions/climateWarehouseActions';
import theme from '../../theme';

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
  display: flex;
  gap: 10px;
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

  svg {
    cursor: pointer;
  }
`;

const Projects = () => {
  const [createFormIsDisplayed, setCreateFormIsDisplayed] = useState(false);
  const [isCommitModalVisible, setIsCommitModalVisible] = useState(false);
  const [isDeleteAllStagingVisible, setIsDeleteAllStagingVisible] =
    useState(false);
  const { notification } = useSelector(store => store.app);
  const {
    project,
    projects,
    stagingData,
    totalProjectsPages,
    totalNumberOfEntries,
  } = useSelector(store => store.climateWarehouse);
  const [tabValue, setTabValue] = useState(0);
  const intl = useIntl();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  let searchParams = new URLSearchParams(location.search);
  const projectsContainerRef = useRef(null);
  const [modalSizeAndPosition, setModalSizeAndPosition] = useState(null);
  const windowSize = useWindowSize();

  const handleTabChange = useCallback(
    (event, newValue) => {
      setTabValue(newValue);
    },
    [setTabValue],
  );

  useEffect(() => {
    const projectId = searchParams.get('projectId');
    if (projectId) {
      dispatch(getProjectData(projectId));
    }
    return () => dispatch(clearProjectData());
  }, [searchParams.get('projectId')]);

  const closeProjectOpenedInDetailedView = () => {
    dispatch(clearProjectData());
    navigate(
      `${location.pathname}?${getUpdatedUrl(location.search, {
        param: 'projectId',
        value: null,
      })}`,
      { replace: true },
    );
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
    dispatch(getStagingData({ useMockedResponse: false }));
  }, [totalProjectsPages]);

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

  const onOrganizationSelect = useCallback(
    selectedOption => {
      const orgUid = selectedOption[0].orgUid;
      setSelectedOrganization(orgUid);
      navigate(
        `${location.pathname}?${getUpdatedUrl(location.search, {
          param: 'orgUid',
          value: orgUid,
        })}`,
        { replace: true },
      );
    },
    [location, setSelectedOrganization],
  );

  const onSearch = useMemo(
    () =>
      _.debounce(event => {
        if (event.target.value !== '') {
          navigate(
            `${location.pathname}?${getUpdatedUrl(location.search, {
              param: 'search',
              value: event.target.value,
            })}`,
            { replace: true },
          );
        } else {
          navigate(
            `${location.pathname}?${getUpdatedUrl(location.search, {
              param: 'search',
              value: null,
            })}`,
            { replace: true },
          );
        }
        setSearchQuery(event.target.value);
      }, 300),
    [dispatch, location],
  );

  useEffect(() => {
    return () => {
      onSearch.cancel();
    };
  }, []);

  useEffect(() => {
    setSearchQuery(null);
  }, [searchParams.get('myRegistry')]);

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
      formType: 'Projects',
      resultsLimit: constants.MAX_TABLE_SIZE,
    };
    dispatch(getStagingPaginatedData(options));
  }, [dispatch]);

  const filteredColumnsTableData = useMemo(() => {
    if (!projects) {
      return null;
    }

    return projects.map(project =>
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
  }, [projects, stagingData]);

  const isDownloadOfferButtonVisible = useMemo(
    () =>
      stagingData?.projects?.pending?.some(
        projectChangeItem => projectChangeItem?.isTransfer,
      ),
    [tabValue],
  );

  const downloadTransferOffer = useCallback(async () => {
    await fetch(`${constants.API_HOST}/offer`)
      .then(async result => await result.blob())
      .then(async response => {
        const filename = await response;
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(new Blob([filename]));
        link.href = url;
        link.download = `offer.txt`;
        document.body.appendChild(link); // Required for this to work in FireFox
        link.click();
      });
  }, []);

  if (!filteredColumnsTableData) {
    return null;
  }

  return (
    <>
      <StyledSectionContainer ref={projectsContainerRef}>
        <StyledHeaderContainer>
          <StyledSearchContainer>
            <SearchInput
              key={pageIsMyRegistryPage.toString()}
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
                icon={
                  <AddIcon
                    width="16.13"
                    height="16.88"
                    fill={theme.colors.default.onButton}
                  />
                }
                onClick={() => {
                  if (
                    _.isEmpty(stagingData.units.pending) &&
                    _.isEmpty(stagingData.projects.pending)
                  ) {
                    setCreateFormIsDisplayed(true);
                  } else {
                    dispatch(setPendingError(true));
                  }
                }}
              />
            )}

            {tabValue === 1 && stagingData.projects.staging.length > 0 && (
              <PrimaryButton
                label={intl.formatMessage({ id: 'commit' })}
                size="large"
                onClick={() => setIsCommitModalVisible(true)}
              />
            )}

            {tabValue === 2 && isDownloadOfferButtonVisible && (
              <>
                <PrimaryButton
                  label={intl.formatMessage({ id: 'download-offer' })}
                  size="large"
                  onClick={downloadTransferOffer}
                />
                <PrimaryButton
                  label={intl.formatMessage({ id: 'cancel-offer' })}
                  size="large"
                  onClick={() => dispatch(cancelTransferOffer())}
                  danger
                />
              </>
            )}
          </StyledButtonContainer>
        </StyledHeaderContainer>
        {isCommitModalVisible && (
          <CommitModal
            onClose={() => setIsCommitModalVisible(false)}
            modalFor="projects"
          />
        )}
        <StyledSubHeaderContainer>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={intl.formatMessage({ id: 'committed' })} />
            {pageIsMyRegistryPage && (
              <Tab
                label={`${intl.formatMessage({ id: 'staging' })} (${
                  totalNumberOfEntries && totalNumberOfEntries.projects.staging
                })`}
              />
            )}
            {pageIsMyRegistryPage && (
              <Tab
                label={`${intl.formatMessage({ id: 'pending' })} (${
                  totalNumberOfEntries && totalNumberOfEntries.projects.pending
                })`}
              />
            )}
            {pageIsMyRegistryPage && (
              <Tab
                label={`${intl.formatMessage({ id: 'failed' })} (${
                  totalNumberOfEntries && totalNumberOfEntries.projects.failed
                })`}
              />
            )}
          </Tabs>
          <StyledCSVOperationsContainer>
            {pageIsMyRegistryPage &&
              tabValue === 1 &&
              stagingData?.projects?.staging?.length > 0 && (
                <span onClick={() => setIsDeleteAllStagingVisible(true)}>
                  <RemoveIcon width={20} height={20} />
                </span>
              )}
            <span onClick={() => downloadTxtFile('projects', searchParams)}>
              <DownloadIcon width={20} height={20} />
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
            {projects && projects.length === 0 && (
              <NoDataMessageContainer>
                <H3>
                  {!searchQuery && pageIsMyRegistryPage && (
                    <>
                      <FormattedMessage id="no-projects-created" />
                      <StyledCreateOneNowContainer
                        onClick={() => {
                          if (
                            _.isEmpty(stagingData.units.pending) &&
                            _.isEmpty(stagingData.projects.pending)
                          ) {
                            setCreateFormIsDisplayed(true);
                          } else {
                            dispatch(setPendingError(true));
                          }
                        }}
                      >
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
            {projects && projects.length > 0 && (
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
                {stagingData && stagingData.projects.staging.length === 0 && (
                  <NoDataMessageContainer>
                    <H3>
                      <FormattedMessage id="no-staged" />
                    </H3>
                  </NoDataMessageContainer>
                )}
                {stagingData && (
                  <StagingDataGroups
                    headings={headings}
                    data={stagingData.projects.staging}
                    deleteStagingData={uuid =>
                      dispatch(deleteStagingData(uuid))
                    }
                    modalSizeAndPosition={modalSizeAndPosition}
                  />
                )}
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                {stagingData && stagingData.projects.pending.length === 0 && (
                  <NoDataMessageContainer>
                    <H3>
                      <FormattedMessage id="no-pending" />
                    </H3>
                  </NoDataMessageContainer>
                )}
                {stagingData && (
                  <StagingDataGroups
                    headings={headings}
                    data={stagingData.projects.pending}
                    modalSizeAndPosition={modalSizeAndPosition}
                  />
                )}
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                {stagingData && stagingData.projects.failed.length === 0 && (
                  <NoDataMessageContainer>
                    <H3>
                      <FormattedMessage id="no-failed" />
                    </H3>
                  </NoDataMessageContainer>
                )}
                {stagingData && (
                  <StagingDataGroups
                    headings={headings}
                    data={stagingData.projects.failed}
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
        <ProjectCreateModal
          onClose={() => {
            setCreateFormIsDisplayed(false);
          }}
          modalSizeAndPosition={modalSizeAndPosition}
        />
      )}
      {isDeleteAllStagingVisible && (
        <Modal
          title={intl.formatMessage({
            id: 'notification',
          })}
          body={intl.formatMessage({
            id: 'confirm-all-staging-data-deletion',
          })}
          modalType={modalTypeEnum.confirmation}
          onClose={() => setIsDeleteAllStagingVisible(false)}
          onOk={() => {
            dispatch(deleteAllStagingData());
            setIsDeleteAllStagingVisible(false);
          }}
        />
      )}
      {project && (
        <ProjectDetailedViewModal
          onClose={closeProjectOpenedInDetailedView}
          modalSizeAndPosition={modalSizeAndPosition}
          projectObject={project}
        />
      )}
    </>
  );
};

export { Projects };

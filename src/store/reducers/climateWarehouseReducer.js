import u from 'updeep';

import { actions as climateWarehouseActions } from '../actions/climateWarehouseActions';

const initialState = {
  ratings: null,
  coBenefits: null,
  qualifications: null,
  projectLocations: null,
  relatedProjects: null,
  units: null,
  unit: null,
  pageCount: null,
  projects: null,
  myProjects: null,
  project: null,
  vintages: null,
  stagingData: null,
  organizations: null,
  pickLists: null,
  issuances: null,
  glossary: null,
  labels: null,
  audit: null,
  conflicts: null,
  stagingPageCount: null,
  totalProjectsPages: null,
  totalUnitsPages: null,
  myOrgUid: null,
  governanceOrgList: null,
  isGovernance: null,
  isGovernanceCreated: null,
  isGovernanceInitiated: null,
  walletBalance: null,
  isWalletSynced: false,
  fileList: null,
  totalNumberOfEntries: null,
  processedTransferOffer: null,
};

const climateWarehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case climateWarehouseActions.GET_ORGANIZATIONS:
      return u({ organizations: action.payload }, state);

    case climateWarehouseActions.GET_TRANSFER_OFFER:
      return u({ processedTransferOffer: action.payload }, state);

    case climateWarehouseActions.SET_IS_GOVERNANCE:
      return u({ isGovernance: action.payload }, state);

    case climateWarehouseActions.SET_IS_GOVERNANCE_INITIATED:
      return u({ isGovernanceInitiated: action.payload }, state);

    case climateWarehouseActions.GET_IS_GOVERNANCE_CREATED:
      return u({ isGovernanceCreated: action.payload }, state);

    case climateWarehouseActions.GET_GOVERNANCE_ORG_LIST:
      return u({ governanceOrgList: action.payload }, state);

    case climateWarehouseActions.GET_FILE_LIST:
      return u({ fileList: action.payload }, state);

    case climateWarehouseActions.SET_MY_ORG_UID:
      return u({ myOrgUid: action.payload }, state);

    case climateWarehouseActions.SET_WALLET_BALANCE:
      return u({ walletBalance: action.payload }, state);

    case climateWarehouseActions.SET_WALLET_STATUS:
      return u({ isWalletSynced: action.payload }, state);

    case climateWarehouseActions.GET_PICKLISTS:
      return u({ pickLists: action.payload }, state);

    case climateWarehouseActions.GET_AUDIT:
      return u({ audit: action.payload }, state);

    case climateWarehouseActions.GET_RATINGS:
      return u({ ratings: action.payload }, state);

    case climateWarehouseActions.GET_COBENEFITS:
      return u({ coBenefits: action.payload }, state);

    case climateWarehouseActions.GET_QUALIFICATIONS:
      return u({ qualifications: action.payload }, state);

    case climateWarehouseActions.GET_ISSUANCES:
      return u({ issuances: action.payload }, state);

    case climateWarehouseActions.GET_LABELS:
      return u({ labels: action.payload }, state);

    case climateWarehouseActions.GET_PROJECT_LOCATIONS:
      return u({ projectLocations: action.payload || [] }, state);

    case climateWarehouseActions.GET_RELATED_PROJECTS:
      return u({ relatedProjects: action.payload }, state);

    case climateWarehouseActions.GET_UNITS:
      return u({ units: action.payload || [] }, state);

    case climateWarehouseActions.GET_UNIT:
      return u({ unit: action.payload }, state);

    case climateWarehouseActions.GET_PROJECTS:
      return u({ projects: action.payload }, state);

    case climateWarehouseActions.GET_MY_PROJECTS:
      return u({ myProjects: action.payload }, state);

    case climateWarehouseActions.GET_PROJECT:
      return u({ project: action.payload }, state);

    case climateWarehouseActions.GET_CONFLICTS:
      return u({ conflicts: action.payload }, state);

    case climateWarehouseActions.GET_VINTAGES:
      return u({ vintages: action.payload }, state);

    case climateWarehouseActions.GET_GLOSSARY:
      return u({ glossary: action.payload }, state);

    case climateWarehouseActions.GET_STAGING_DATA:
      return u({ stagingData: action.payload }, state);

    case climateWarehouseActions.GET_TOTAL_NR_OF_STAGED_ENTRIES:
      return u({ totalNumberOfEntries: action.payload }, state);

    case climateWarehouseActions.GET_STAGING_PROJECTS_PAGES:
      return u({ totalProjectsPages: action.payload }, state);

    case climateWarehouseActions.GET_STAGING_UNITS_PAGES:
      return u({ totalUnitsPages: action.payload }, state);

    case climateWarehouseActions.GET_PROJECTS_PAGE_COUNT:
    case climateWarehouseActions.GET_UNITS_PAGE_COUNT:
      return u({ pageCount: action.payload }, state);

    case climateWarehouseActions.GET_STAGING_PAGE_COUNT:
      return u({ stagingPageCount: action.payload }, state);

    default:
      return state;
  }
};

export { climateWarehouseReducer };

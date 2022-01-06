import { expect } from 'chai';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { appReducer, climateWarehouseReducer } from '../src/store/reducers';
import {
  getProjects,
  getRelatedProjects,
  getUnits,
  getRatings,
  getCoBenefits,
  getProjectLocations,
  getQualifications,
  getVintages,
} from '../src/store/actions/climateWarehouseActions';
import {
  projectsResponseStub,
  unitsResponseStub,
  relatedProjectsResponseStub,
  projectRatingResponseStub,
  coBenefitResponseStub,
  projectLocationsResponseStub,
  qualificationsResponseStub,
  vintagesResponseStub,
} from '../src/mocks';

const rootReducer = combineReducers({
  app: appReducer,
  climateWarehouse: climateWarehouseReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

describe('test climateWarehouse store actions', () => {
  it('getProjects useMockedResponse', async () => {
    store.dispatch(getProjects({ useMockedResponse: true, useApiMock: false }));

    const parsedJson = JSON.parse(JSON.stringify(projectsResponseStub));

    const projects = store.getState().climateWarehouse.projects;

    expect(projects[0].warehouseProjectId).to.equal(
      parsedJson[0].warehouseProjectId,
    );
  });

  it('getCoBenefits useMockedResponse', async () => {
    store.dispatch(
      getCoBenefits({ useMockedResponse: true, useApiMock: false }),
    );

    const parsedJson = JSON.parse(JSON.stringify(coBenefitResponseStub));

    const coBenefits = store.getState().climateWarehouse.coBenefits;

    expect(coBenefits[0].cobenefit).to.equal(parsedJson[0].cobenefit);
  });

  it('getProjectLocations useMockedResponse', async () => {
    store.dispatch(
      getProjectLocations({ useMockedResponse: true, useApiMock: false }),
    );

    const parsedJson = JSON.parse(JSON.stringify(projectLocationsResponseStub));

    const projectLocations = store.getState().climateWarehouse.projectLocations;

    expect(projectLocations[0].host_country).to.equal(
      parsedJson[0].host_country,
    );
  });

  it('getQualifications useMockedResponse', async () => {
    store.dispatch(
      getQualifications({ useMockedResponse: true, useApiMock: false }),
    );

    const parsedJson = JSON.parse(JSON.stringify(qualificationsResponseStub));

    const projectLocations = store.getState().climateWarehouse.qualifications;

    expect(projectLocations[0].project_id).to.equal(parsedJson[0].project_id);
  });

  it('getVintages useMockedResponse', async () => {
    store.dispatch(getVintages({ useMockedResponse: true, useApiMock: false }));

    const parsedJson = JSON.parse(JSON.stringify(vintagesResponseStub));

    const vintages = store.getState().climateWarehouse.vintages;

    expect(vintages[0].vintage_start_date).to.equal(
      parsedJson[0].vintage_start_date,
    );
  });

  it('getRelatedProjects useMockedResponse', async () => {
    store.dispatch(
      getRelatedProjects({ useMockedResponse: true, useApiMock: false }),
    );

    const parsedJson = JSON.parse(JSON.stringify(relatedProjectsResponseStub));

    const relatedProjects = store.getState().climateWarehouse.relatedProjects;

    expect(relatedProjects[0].id).to.equal(parsedJson[0].id);
  });

  it('getRatings useMockedResponse', async () => {
    store.dispatch(getRatings({ useMockedResponse: true, useApiMock: false }));

    const parsedJson = JSON.parse(JSON.stringify(projectRatingResponseStub));

    const ratings = store.getState().climateWarehouse.ratings;

    expect(ratings[0].link).to.equal(parsedJson[0].link);
  });

  it('getUnits useMockedResponse', async () => {
    store.dispatch(getUnits({ useMockedResponse: true, useApiMock: false }));

    const parsedJson = JSON.parse(JSON.stringify(unitsResponseStub));

    const units = store.getState().climateWarehouse.units;

    expect(units[0].blockIdentifier).to.equal(parsedJson[0].blockIdentifier);
  });
});

import { expect } from 'chai';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { appReducer, climateWarehouseReducer } from '../src/store/reducers';
import {
  getProjects,
  getRelatedProjects,
  getUnits,
  getRatings,
} from '../src/store/actions/climateWarehouseActions';
import {
  projectsResponseStub,
  unitsResponseStub,
  relatedProjectsResponseStub,
  projectRatingResponseStub,
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

    expect(ratings[0].link).to.equal(
      parsedJson[0].link,
    );
  });

  it('getUnits useMockedResponse', async () => {
    store.dispatch(getUnits({ useMockedResponse: true, useApiMock: false }));

    const parsedJson = JSON.parse(JSON.stringify(unitsResponseStub));

    const units = store.getState().climateWarehouse.units;

    expect(units[0].unitBlockIdentifier).to.equal(
      parsedJson[0].unitBlockIdentifier,
    );
  });
});

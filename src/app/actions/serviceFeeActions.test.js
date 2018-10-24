import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as mintApi from '../../api/mintApi';
import sinon from 'sinon';
import * as types from './actionTypes';
import * as serviceFeeActions from './serviceFeeActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("serviceFeeActions tests", () => {
  it("calculates service fee successfully", (done) => {
    const getFeeStub = sinon.stub(mintApi, "getFee").resolves(1);
    const expectedActions = [
      { type: types.SET_SERVICE_FEE, serviceFee: 1 },
    ];
    const store = mockStore({ serviceFee: 0 }, expectedActions);
    store.dispatch(serviceFeeActions.calculateServiceFee()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      getFeeStub.restore();
      done();
    });
  });

  it("calculates service fee with exception", (done) => {
    const getFeeStub = sinon.stub(mintApi, "getFee").rejects(new Error());
    const expectedActions = [
      { type: types.SET_SERVICE_FEE, serviceFee: -1 },
    ];
    const store = mockStore({ serviceFee: 0 }, expectedActions);
    store.dispatch(serviceFeeActions.calculateServiceFee()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      getFeeStub.restore();
      done();
    });
  });
});

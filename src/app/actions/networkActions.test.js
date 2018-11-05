import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as mintApi from '../../api/mintApi';
import sinon from 'sinon';
import * as types from './actionTypes';
import * as networkActions from './networkActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("checkNetworkActions tests", () => {
  it("checks network successfully", (done) => {
    const getNetworkStub = sinon.stub(mintApi, "getNetwork").resolves("main");
    const expectedActions = [
      { type: types.SET_CHECKING_NETWORK, checkingNetwork: true },
      { type: types.SET_NETWORK, network: "main" },
      { type: types.SET_CHECKING_NETWORK, checkingNetwork: false }
    ];
    const store = mockStore({ network: "", checkingNetwork: false }, expectedActions);
    store.dispatch(networkActions.getNetworkType()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      getNetworkStub.restore();
      done();
    });
  });

  it("checks network with exception", (done) => {
    const getNetworkStub = sinon.stub(mintApi, "getNetwork").rejects(new Error("No network"));
    const expectedActions = [
      { type: types.SET_CHECKING_NETWORK, checkingNetwork: true },
      { type: types.SET_NETWORK, network: mintApi.NO_NETWORK },
      { type: types.SET_CHECKING_NETWORK, checkingNetwork: false }
    ];
    const store = mockStore({ network: "", checkingNetwork: false }, expectedActions);
    store.dispatch(networkActions.getNetworkType()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      getNetworkStub.restore();
      done();
    });
  });
});

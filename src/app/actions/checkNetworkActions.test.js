import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as mintApi from '../../api/mintApi';
import sinon from 'sinon';
import * as types from './actionTypes';
import * as checkNetworkActions from './checkNetworkActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("checkNetworkActions tests", () => {
  it("checks network successfully", (done) => {
    const isMainNetStub = sinon.stub(mintApi, "isMainNet").resolves(true);
    const expectedActions = [
      { type: types.SET_CHECKING_NETWORK, checkingNetwork: true },
      { type: types.SET_IS_MAIN_NET, isMainNet: true },
      { type: types.SET_CHECKING_NETWORK, checkingNetwork: false }
    ];
    const store = mockStore({ isMainNet: true, checkingNetwork: false }, expectedActions);
    store.dispatch(checkNetworkActions.checkNetwork()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      isMainNetStub.restore();
      done();
    });
  });

  it("checks network with exception", (done) => {
    const isMainNetStub = sinon.stub(mintApi, "isMainNet").rejects(new Error("No network"));
    const expectedActions = [
      { type: types.SET_CHECKING_NETWORK, checkingNetwork: true },
      { type: types.SET_IS_MAIN_NET, isMainNet: false },
      { type: types.SET_CHECKING_NETWORK, checkingNetwork: false }
    ];
    const store = mockStore({ isMainNet: true, checkingNetwork: false }, expectedActions);
    store.dispatch(checkNetworkActions.checkNetwork()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedActions[0]);
      expect(actions[1]).to.deep.equal(expectedActions[1]);
      expect(actions[2]).to.deep.equal(expectedActions[2]);
      isMainNetStub.restore();
      done();
    });
  });
});

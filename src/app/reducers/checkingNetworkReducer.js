import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function checkingNetworkReducer(state = initialState.checkingNetwork, action) {
  switch (action.type) {
    case types.SET_CHECKING_NETWORK:
      return action.checkingNetwork;

    default:
      return state;
  }
}

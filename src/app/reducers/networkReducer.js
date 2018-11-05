import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function networkReducer(state = initialState.network, action) {
  switch (action.type) {
    case types.SET_NETWORK:
      return action.network;

    default:
      return state;
  }
}

import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function isMainNetReducer(state = initialState.isMainNet, action) {
  switch (action.type) {
    case types.SET_IS_MAIN_NET:
      return action.isMainNet;

    default:
      return state;
  }
}

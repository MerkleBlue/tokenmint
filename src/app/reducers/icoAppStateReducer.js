import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function icoAppStateReducer(state = initialState.appState, action) {
  switch (action.type) {
    case types.SET_ICO_APP_STATE:
      return action.icoAppState;

    default:
      return state;
  }
}

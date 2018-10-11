import * as types from './actionTypes';

export function setAppState(appState) {
  return { type: types.SET_APP_STATE, appState: appState };
}

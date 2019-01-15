import * as types from './actionTypes';

export function setAppState(appState) {
  return { type: types.SET_APP_STATE, appState: appState };
}

export function setIcoAppState(icoAppState) {
  return { type: types.SET_ICO_APP_STATE, icoAppState: icoAppState };
}

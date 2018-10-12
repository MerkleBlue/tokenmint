import * as types from './actionTypes';

export function setInfoMessage(infoMessage) {
  return { type: types.SET_INFO_MESSAGE, infoMessage: infoMessage };
}

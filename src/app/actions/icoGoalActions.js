import * as types from './actionTypes';

export function setIcoGoal(icoGoal) {
  return { type: types.SET_ICO_GOAL, icoGoal: icoGoal };
}

import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function icoOpeningTimeReducer(state = initialState.icoOpeningTime, action) {
  switch (action.type) {
    case types.SET_OPENING_TIME:
      return action.icoOpeningTime;

    default:
      return state;
  }
}

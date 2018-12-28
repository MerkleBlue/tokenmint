import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function icoClosingTimeReducer(state = initialState.icoClosingTime, action) {
  switch (action.type) {
    case types.SET_CLOSING_TIME:
      return action.icoClosingTime;

    default:
      return state;
  }
}

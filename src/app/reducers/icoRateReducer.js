import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function icoCapReducer(state = initialState.icoRate, action) {
  switch (action.type) {
    case types.SET_ICO_RATE:
      return action.icoRate;

    default:
      return state;
  }
}

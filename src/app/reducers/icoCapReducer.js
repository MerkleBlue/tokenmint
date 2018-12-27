import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function icoCapReducer(state = initialState.icoCap, action) {
  switch (action.type) {
    case types.SET_ICO_CAP:
      return action.icoCap;

    default:
      return state;
  }
}

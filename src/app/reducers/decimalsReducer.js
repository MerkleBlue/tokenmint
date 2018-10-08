import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function decimalsReducer(state = initialState.decimals, action) {
  switch (action.type) {
    case types.SET_DECIMALS:
      return action.decimals;

    default:
      return state;
  }
}

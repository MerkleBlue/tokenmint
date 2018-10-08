import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function totalSupplyReducer(state = initialState.totalSupply, action) {
  switch (action.type) {
    case types.SET_TOTAL_SUPPLY:
      return action.totalSupply;

    default:
      return state;
  }
}

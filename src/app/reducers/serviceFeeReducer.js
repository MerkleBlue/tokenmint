import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function serviceFeeReducer(state = initialState.serviceFee, action) {
  switch (action.type) {
    case types.SET_SERVICE_FEE:
      return action.serviceFee;

    default:
      return state;
  }
}

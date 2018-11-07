import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tokenOwnerHasInsufficientFundsReducer(state = initialState.tokenOwnerHasInsufficientFunds, action) {
  switch (action.type) {
    case types.SET_TOKEN_OWNER_HAS_INSUFFICIENT_FUNDS:
      return action.tokenOwnerHasInsufficientFunds;

    default:
      return state;
  }
}

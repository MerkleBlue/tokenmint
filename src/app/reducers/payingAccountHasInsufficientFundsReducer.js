import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function payingAccountHasInsufficientFundsReducer(state = initialState.payingAccountHasInsufficientFunds, action) {
  switch (action.type) {
    case types.SET_PAYING_ACCOUNT_HAS_INSUFFICIENT_FUNDS:
      return action.payingAccountHasInsufficientFunds;

    default:
      return state;
  }
}

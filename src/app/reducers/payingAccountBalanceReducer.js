import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function payingAccountBalanceReducer(state = initialState.payingAccountBalance, action) {
  switch (action.type) {
    case types.SET_PAYING_ACCOUNT_BALANCE:
      return action.payingAccountBalance;

    default:
      return state;
  }
}

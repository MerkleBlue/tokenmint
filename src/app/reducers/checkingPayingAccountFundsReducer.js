import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function checkingPayingAccountFundsReducer(state = initialState.checkingPayingAccountFunds, action) {
  switch (action.type) {
    case types.SET_CHECKING_PAYING_ACCOUNT_FUNDS:
      return action.checkingPayingAccountFunds;

    default:
      return state;
  }
}

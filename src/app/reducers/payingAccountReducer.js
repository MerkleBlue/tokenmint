import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function payingAccountReducer(state = initialState.payingAccount, action) {
  switch (action.type) {
    case types.SET_PAYING_ACCOUNT:
      return action.payingAccount;

    default:
      return state;
  }
}

import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loadingAccountsReducer(state = initialState.loadingAccounts, action) {
  switch (action.type) {
    case types.SET_LOADING_ACCOUNTS:
      return action.loadingAccounts;

    default:
      return state;
  }
}

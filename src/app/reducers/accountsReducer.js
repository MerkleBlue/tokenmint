import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function accountsReducer(state = initialState.accounts, action) {
  switch (action.type) {
    case types.SET_ACCOUNTS:
      return action.accounts;

    default:
      return state;
  }
}

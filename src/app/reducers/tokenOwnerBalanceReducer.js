import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tokenOwnerBalanceReducer(state = initialState.tokenOwnerBalance, action) {
  switch (action.type) {
    case types.SET_TOKEN_OWNER_BALANCE:
      return action.tokenOwnerBalance;

    default:
      return state;
  }
}

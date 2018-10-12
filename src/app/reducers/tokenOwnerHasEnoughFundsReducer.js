import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tokenOwnerHasEnoughFundsReducer(state = initialState.tokenOwnerHasEnoughFunds, action) {
  switch (action.type) {
    case types.SET_TOKEN_OWNER_HAS_ENOUGH_FUNDS:
      return action.tokenOwnerHasEnoughFunds;

    default:
      return state;
  }
}

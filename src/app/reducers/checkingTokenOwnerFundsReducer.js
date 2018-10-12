import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function checkingTokenOwnerFundsReducer(state = initialState.checkingTokenOwnerFunds, action) {
  switch (action.type) {
    case types.SET_CHECKING_TOKEN_OWNER_FUNDS:
      return action.checkingTokenOwnerFunds;

    default:
      return state;
  }
}

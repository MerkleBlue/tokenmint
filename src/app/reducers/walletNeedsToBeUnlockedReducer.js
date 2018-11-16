import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function walletNeedsToBeUnlockedReducer(state = initialState.walletNeedsToBeUnlocked, action) {
  switch (action.type) {
    case types.SET_WALLET_NEEDS_TO_BE_UNLOCKED:
      return action.walletNeedsToBeUnlocked;

    default:
      return state;
  }
}

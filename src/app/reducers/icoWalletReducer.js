import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function icoWalletReducer(state = initialState.icoWallet, action) {
  switch (action.type) {
    case types.SET_ICO_WALLET:
      return action.icoWallet;

    default:
      return state;
  }
}

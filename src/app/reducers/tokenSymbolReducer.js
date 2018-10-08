import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tokenSymbolReducer(state = initialState.tokenSymbol, action) {
  switch (action.type) {
    case types.SET_TOKEN_SYMBOL:
      return action.tokenSymbol;

    default:
      return state;
  }
}

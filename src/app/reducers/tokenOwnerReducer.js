import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tokenOwnerReducer(state = initialState.tokenOwner, action) {
  switch (action.type) {
    case types.SET_TOKEN_OWNER:
      return action.tokenOwner;

    case types.INIT_TOKEN_OWNER:
      return state === initialState.tokenOwner ? action.tokenOwner : state;

    default:
      return state;
  }
}

import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tokenOwnerReducer(state = initialState.tokenOwner, action) {
  switch (action.type) {
    case types.SET_TOKEN_OWNER:
      return action.tokenOwner;

    default:
      return state;
  }
}

import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tokenNameReducer(state = initialState.tokenName, action) {
  switch (action.type) {
    case types.SET_TOKEN_NAME:
      return action.tokenName;

    default:
      return state;
  }
}

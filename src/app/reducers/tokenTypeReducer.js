import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tokenTypeReducer(state = initialState.tokenType, action) {
  switch (action.type) {
    case types.SET_TOKEN_TYPE:
      return action.tokenType;

    default:
      return state;
  }
}

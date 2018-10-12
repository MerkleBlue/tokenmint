import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function infoMessageReducer(state = initialState.infoMessage, action) {
  switch (action.type) {
    case types.SET_INFO_MESSAGE:
      return action.infoMessage;

    default:
      return state;
  }
}

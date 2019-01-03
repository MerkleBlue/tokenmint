import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function icoGoalReducer(state = initialState.icoGoal, action) {
  switch (action.type) {
    case types.SET_ICO_GOAL:
      return action.icoGoal;

    default:
      return state;
  }
}

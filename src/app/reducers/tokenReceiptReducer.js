import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tokenReceiptReducer(state = initialState.tokenReceipt, action) {
  switch (action.type) {
    case types.SET_TOKEN_RECEIPT:
      return Object.assign({}, state, action.tokenReceipt);

    default:
      return state;
  }
}

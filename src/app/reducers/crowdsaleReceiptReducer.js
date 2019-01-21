import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function crowdsaleReceiptReducer(state = initialState.crowdsaleReceipt, action) {
  switch (action.type) {
    case types.SET_CROWDSALE_RECEIPT:
      return Object.assign({}, state, action.crowdsaleReceipt);

    default:
      return state;
  }
}

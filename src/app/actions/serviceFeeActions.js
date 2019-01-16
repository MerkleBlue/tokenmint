import * as types from './actionTypes';

export function setServiceFee(serviceFee) {
  return { type: types.SET_SERVICE_FEE, serviceFee: serviceFee };
}

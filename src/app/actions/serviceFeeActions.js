import * as types from './actionTypes';
import { serviceTypeEnum, setServiceFeeInUsd } from '../../api/mintApi';

export function setServiceFee(serviceFee) {
  return { type: types.SET_SERVICE_FEE, serviceFee: serviceFee };
}

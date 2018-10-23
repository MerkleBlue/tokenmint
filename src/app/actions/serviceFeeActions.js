import * as types from './actionTypes';
import { getFee } from '../../api/mintApi';
import initialState from '../reducers/initialState';

export function calculateServiceFee() {
  return (dispatch) => {
    dispatch(setCalculatingServiceFee(true));
    return getFee().then(serviceFee => {
      dispatch(setServiceFee(serviceFee));
      dispatch(setCalculatingServiceFee(false));
    }).catch(() => {
      dispatch(setServiceFee(initialState.serviceFee));
      dispatch(setCalculatingServiceFee(false));
    });
  };
}

export function setServiceFee(serviceFee) {
  return { type: types.SET_SERVICE_FEE, serviceFee: serviceFee };
}

export function setCalculatingServiceFee(calculatingServiceFee) {
  return { type: types.CALCULATING_SERVICE_FEE, calculatingServiceFee: calculatingServiceFee };
}

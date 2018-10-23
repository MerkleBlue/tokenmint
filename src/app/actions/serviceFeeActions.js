import * as types from './actionTypes';
import { getFee } from '../../api/mintApi';
import initialState from '../reducers/initialState';

export function calculateServiceFee() {
  return (dispatch) => {
    return getFee().then(serviceFee => {
      dispatch(setServiceFee(serviceFee));
    }).catch(() => {
      dispatch(setServiceFee(initialState.serviceFee));
    });
  };
}

export function setServiceFee(serviceFee) {
  return { type: types.SET_SERVICE_FEE, serviceFee: serviceFee };
}

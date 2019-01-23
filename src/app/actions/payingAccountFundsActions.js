import * as types from './actionTypes';
import { checkAccountFunds } from '../../api/mintApi';
import { setServiceFee } from './serviceFeeActions';
import initialState from '../reducers/initialState';

export function checkFunds(account) {
  return (dispatch) => {
    dispatch(setCheckingPayingAccountFunds(true));
    dispatch(setPayingAccountHasInsufficientFunds(false));
    return checkAccountFunds(account).then((reply) => {
      dispatch(setPayingAccountBalance(reply.accountBalance));
      dispatch(setServiceFee(reply.serviceFee));
      dispatch(setPayingAccountHasInsufficientFunds(reply.accountBalance - reply.serviceFee - 0.02 <= 0));
      dispatch(setCheckingPayingAccountFunds(false));
    }).catch(() => {
      dispatch(setPayingAccountBalance(initialState.payingAccountBalance));
      dispatch(setServiceFee(-1));
      dispatch(setPayingAccountHasInsufficientFunds(false));
      dispatch(setCheckingPayingAccountFunds(false));
    });
  };
}

export function setCheckingPayingAccountFunds(checkingPayingAccountFunds) {
  return { type: types.SET_CHECKING_PAYING_ACCOUNT_FUNDS, checkingPayingAccountFunds: checkingPayingAccountFunds };
}

export function setPayingAccountBalance(payingAccountBalance) {
  return { type: types.SET_PAYING_ACCOUNT_BALANCE, payingAccountBalance: payingAccountBalance };
}

export function setPayingAccountHasInsufficientFunds(payingAccountHasInsufficientFunds) {
  return { type: types.SET_PAYING_ACCOUNT_HAS_INSUFFICIENT_FUNDS, payingAccountHasInsufficientFunds: payingAccountHasInsufficientFunds };
}

import * as types from './actionTypes';
import { checkTokenOwnerFunds } from '../../api/mintApi';
import { setServiceFee } from './serviceFeeActions';
import initialState from '../reducers/initialState';

export function checkFunds(tokenOwner) {
  return (dispatch) => {
    dispatch(setCheckingTokenOwnerFunds(true));
    dispatch(setTokenOwnerHasInsufficientFunds(false));
    return checkTokenOwnerFunds(tokenOwner).then((reply) => {
      dispatch(setTokenOwnerBalance(reply.tokenOwnerBalance));
      dispatch(setServiceFee(reply.serviceFee));
      dispatch(setTokenOwnerHasInsufficientFunds(reply.tokenOwnerBalance - reply.serviceFee - 0.02 <= 0));
      dispatch(setCheckingTokenOwnerFunds(false));
    }).catch(() => {
      dispatch(setTokenOwnerBalance(initialState.tokenOwnerBalance));
      dispatch(setServiceFee(-1));
      dispatch(setTokenOwnerHasInsufficientFunds(false));
      dispatch(setCheckingTokenOwnerFunds(false));
    });
  };
}

export function setCheckingTokenOwnerFunds(checkingTokenOwnerFunds) {
  return { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: checkingTokenOwnerFunds };
}

export function setTokenOwnerBalance(tokenOwnerBalance) {
  return { type: types.SET_TOKEN_OWNER_BALANCE, tokenOwnerBalance: tokenOwnerBalance };
}

export function setTokenOwnerHasInsufficientFunds(tokenOwnerHasInsufficientFunds) {
  return { type: types.SET_TOKEN_OWNER_HAS_INSUFFICIENT_FUNDS, tokenOwnerHasInsufficientFunds: tokenOwnerHasInsufficientFunds };

}

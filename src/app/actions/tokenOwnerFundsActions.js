import * as types from './actionTypes';
import { checkTokenOwnerFunds } from '../../api/mintApi';

export function checkFunds(tokenOwner) {
  return (dispatch) => {
    dispatch(setCheckingTokenOwnerFunds(true));
    return checkTokenOwnerFunds(tokenOwner).then((hasEnoughFunds) => {
      dispatch(setTokenOwnerHasEnoughFunds(hasEnoughFunds));
      dispatch(setCheckingTokenOwnerFunds(false));
    }).catch(() => {
      dispatch(setTokenOwnerHasEnoughFunds(false));
      dispatch(setCheckingTokenOwnerFunds(false));
    });
  };
}

export function setCheckingTokenOwnerFunds(checkingTokenOwnerFunds) {
  return { type: types.SET_CHECKING_TOKEN_OWNER_FUNDS, checkingTokenOwnerFunds: checkingTokenOwnerFunds };
}

export function setTokenOwnerHasEnoughFunds(tokenOwnerHasEnoughFunds) {
  return { type: types.SET_TOKEN_OWNER_HAS_ENOUGH_FUNDS, tokenOwnerHasEnoughFunds: tokenOwnerHasEnoughFunds };
}

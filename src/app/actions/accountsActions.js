import * as types from './actionTypes';
import { loadAccounts } from '../../api/mintApi';
import { setTokenOwner } from './tokenOwnerActions';

export function loadAllAccounts() {
  return (dispatch) => {
    dispatch(setLoadingAccounts(true));
    return loadAccounts().then(accounts => {
      dispatch(setAccounts(accounts));
      dispatch(setLoadingAccounts(false));
      if (accounts.length > 0) {
        dispatch(setTokenOwner(accounts[0]));
      }
    }).catch(() => {
      dispatch(setAccounts([]));
      dispatch(setLoadingAccounts(false));
    });
  };
}

export function setAccounts(accounts) {
  return { type: types.SET_ACCOUNTS, accounts: accounts };
}

export function setLoadingAccounts(loadingAccounts) {
  return { type: types.SET_LOADING_ACCOUNTS, loadingAccounts: loadingAccounts };
}

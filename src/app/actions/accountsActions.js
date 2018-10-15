import * as types from './actionTypes';
import { loadAccounts } from '../../api/mintApi';

export function loadAllAccounts() {
  return (dispatch) => {
    dispatch(setLoadingAccounts(true));
    return loadAccounts().then(accounts => {
      dispatch(setAccounts(accounts));
      dispatch(setLoadingAccounts(false));
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

import * as types from './actionTypes';
import * as mintApi from '../../api/mintApi';
import { loadAllAccounts } from './accountsActions';

export function unlockWallet() {
  return (dispatch) => {
    return mintApi.unlockWallet().then(() => {
      dispatch(loadAllAccounts());
      dispatch(setWalletNeedsToBeUnlocked(false));
    }).catch(e => {
      dispatch(setWalletNeedsToBeUnlocked(true));
    });
  };
}

export function setWalletNeedsToBeUnlocked(walletNeedsToBeUnlocked) {
  return { type: types.SET_WALLET_NEEDS_TO_BE_UNLOCKED, walletNeedsToBeUnlocked: walletNeedsToBeUnlocked };
}

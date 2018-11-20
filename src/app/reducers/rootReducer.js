import { combineReducers } from 'redux';
import tokenName from './tokenNameReducer';
import tokenSymbol from './tokenSymbolReducer';
import decimals from './decimalsReducer';
import tokenOwner from './tokenOwnerReducer';
import tokenType from './tokenTypeReducer';
import totalSupply from './totalSupplyReducer';
import accounts from './accountsReducer';
import appState from './appStateReducer';
import checkingTokenOwnerFunds from './checkingTokenOwnerFundsReducer';
import tokenOwnerBalance from './tokenOwnerBalanceReducer';
import loadingAccounts from './loadingAccountsReducer';
import infoMessage from './infoMessageReducer';
import serviceFee from './serviceFeeReducer';
import network from './networkReducer';
import checkingNetwork from './checkingNetworkReducer';
import tokenOwnerHasInsufficientFunds from './tokenOwnerHasInsufficientFundsReducer';
import isMobileDevice from './isMobileDeviceReducer';
import walletNeedsToBeUnlocked from './walletNeedsToBeUnlockedReducer';

const rootReducer = combineReducers({
  tokenName: tokenName,
  tokenSymbol: tokenSymbol,
  decimals: decimals,
  tokenOwner: tokenOwner,
  tokenType: tokenType,
  totalSupply: totalSupply,
  accounts: accounts,
  appState: appState,
  checkingTokenOwnerFunds: checkingTokenOwnerFunds,
  tokenOwnerBalance: tokenOwnerBalance,
  infoMessage: infoMessage,
  loadingAccounts: loadingAccounts,
  serviceFee: serviceFee,
  network: network,
  checkingNetwork: checkingNetwork,
  tokenOwnerHasInsufficientFunds: tokenOwnerHasInsufficientFunds,
  isMobileDevice: isMobileDevice,
  walletNeedsToBeUnlocked: walletNeedsToBeUnlocked
});

export default rootReducer;

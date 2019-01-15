import { combineReducers } from 'redux';
import tokenName from './tokenNameReducer';
import tokenSymbol from './tokenSymbolReducer';
import decimals from './decimalsReducer';
import tokenOwner from './tokenOwnerReducer';
import tokenType from './tokenTypeReducer';
import totalSupply from './totalSupplyReducer';
import accounts from './accountsReducer';
import appState from './appStateReducer';
import icoAppState from './icoAppStateReducer';
import checkingPayingAccountFunds from './checkingPayingAccountFundsReducer';
import payingAccountBalance from './payingAccountBalanceReducer';
import loadingAccounts from './loadingAccountsReducer';
import infoMessage from './infoMessageReducer';
import serviceFee from './serviceFeeReducer';
import network from './networkReducer';
import checkingNetwork from './checkingNetworkReducer';
import payingAccountHasInsufficientFunds from './payingAccountHasInsufficientFundsReducer';
import isMobileDevice from './isMobileDeviceReducer';
import walletNeedsToBeUnlocked from './walletNeedsToBeUnlockedReducer';
import payingAccount from './payingAccountReducer';
import icoCap from './icoCapReducer';
import icoRate from './icoRateReducer';
import icoWallet from './icoWalletReducer';
import icoOpeningTime from './icoOpeningTimeReducer';
import icoClosingTime from './icoClosingTimeReducer';
import icoGoal from './icoGoalReducer';

const rootReducer = combineReducers({
  tokenName: tokenName,
  tokenSymbol: tokenSymbol,
  decimals: decimals,
  tokenOwner: tokenOwner,
  tokenType: tokenType,
  totalSupply: totalSupply,
  accounts: accounts,
  appState: appState,
  checkingPayingAccountFunds: checkingPayingAccountFunds,
  payingAccountBalance: payingAccountBalance,
  infoMessage: infoMessage,
  loadingAccounts: loadingAccounts,
  serviceFee: serviceFee,
  network: network,
  checkingNetwork: checkingNetwork,
  payingAccountHasInsufficientFunds: payingAccountHasInsufficientFunds,
  isMobileDevice: isMobileDevice,
  walletNeedsToBeUnlocked: walletNeedsToBeUnlocked,
  payingAccount: payingAccount,
  icoCap: icoCap,
  icoRate: icoRate,
  icoWallet: icoWallet,
  icoOpeningTime: icoOpeningTime,
  icoClosingTime: icoClosingTime,
  icoGoal: icoGoal,
  icoAppState: icoAppState
});

export default rootReducer;

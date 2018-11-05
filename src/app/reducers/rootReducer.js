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
import tokenOwnerHasEnoughFunds from './tokenOwnerHasEnoughFundsReducer';
import loadingAccounts from './loadingAccountsReducer';
import infoMessage from './infoMessageReducer';
import serviceFee from './serviceFeeReducer';
import network from './networkReducer';
import checkingNetwork from './checkingNetworkReducer';

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
  tokenOwnerHasEnoughFunds: tokenOwnerHasEnoughFunds,
  infoMessage: infoMessage,
  loadingAccounts: loadingAccounts,
  serviceFee: serviceFee,
  network: network,
  checkingNetwork: checkingNetwork
});

export default rootReducer;

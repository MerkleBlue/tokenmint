import { combineReducers } from 'redux';
import tokenName from './tokenNameReducer';
import tokenSymbol from './tokenSymbolReducer';
import decimals from './decimalsReducer';
import tokenOwner from './tokenOwnerReducer';
import tokenType from './tokenTypeReducer';
import totalSupply from './totalSupplyReducer';
import accounts from './accountsReducer';

const rootReducer = combineReducers({
  tokenName: tokenName,
  tokenSymbol: tokenSymbol,
  decimals: decimals,
  tokenOwner: tokenOwner,
  tokenType: tokenType,
  totalSupply: totalSupply,
  accounts: accounts
});

export default rootReducer;

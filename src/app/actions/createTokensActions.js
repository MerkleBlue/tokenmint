import { setAppState } from './appStateActions';
import { mintTokens } from '../../api/mintApi';
import appStates from '../reducers/appStates';

export function createTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, tokenOwner) {
  return (dispatch) => {
    dispatch(setAppState(appStates.MINING_IN_PROGRESS));
    return mintTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, tokenOwner).then(() => {
      dispatch(setAppState(appStates.MINING_FINISHED));
    }).catch(error => {
      throw (error);
    });
  };
}

import { setAppState } from './appStateActions';
import { createTokensDummy } from '../../tools/dummyApi';
import appStates from '../reducers/appStates';

export function createTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, tokenOwner) {
  return (dispatch) => {
    dispatch(setAppState(appStates.MINING_IN_PROGRESS));
    return createTokensDummy().then(() => {
      dispatch(setAppState(appStates.MINING_FINISHED));
    }).catch(error => {
      throw (error);
    });
  };
}

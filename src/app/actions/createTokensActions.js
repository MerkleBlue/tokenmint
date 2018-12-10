import { setAppState } from './appStateActions';
import { mintTokens } from '../../api/mintApi';
import appStates from '../reducers/appStates';
import { setInfoMessage } from './infoMessageActions';

export function createTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, tokenOwner, serviceFee, payingAccount) {
  return (dispatch) => {
    dispatch(setInfoMessage("Your tokens are being mined. This might take a few minutes. Confirm transaction in your wallet."));
    dispatch(setAppState(appStates.MINING_IN_PROGRESS));
    return mintTokens(tokenName, tokenSymbol, decimals, totalSupply, tokenType, tokenOwner, serviceFee, payingAccount).then(txHash => {
      dispatch(setInfoMessage(txHash));
      dispatch(setAppState(appStates.MINING_CONFIRMED));
    }).catch(e => {
      dispatch(setInfoMessage(e.message));
      dispatch(setAppState(appStates.MINING_FAILED));
    });
  };
}

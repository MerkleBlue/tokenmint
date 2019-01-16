import { setIcoAppState } from './appStateActions';
import { deployCMRPDCrowdsale } from '../../api/mintApi';
import appStates from '../reducers/appStates';
import { setInfoMessage } from './infoMessageActions';

export function launchICO(owner, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH) {
  return (dispatch) => {
    dispatch(setIcoAppState(appStates.MINING_IN_PROGRESS));
    return deployCMRPDCrowdsale(owner, tokenArgs, crowdsaleArgs, tokenServiceFeeETH, crowdsaleServiceFeeETH).then(result => {
      //dispatch(setInfoMessage(txHash));
      console.log(result.tokenReceipt);
      console.log(result.crowdsaleReceipt);
      dispatch(setIcoAppState(appStates.MINING_CONFIRMED));
    }).catch(e => {
      dispatch(setInfoMessage(e.message));
      dispatch(setIcoAppState(appStates.MINING_FAILED));
    });
  };
}

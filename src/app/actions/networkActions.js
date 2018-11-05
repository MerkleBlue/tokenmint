import * as types from './actionTypes';
import { getNetwork, NO_NETWORK } from '../../api/mintApi';

export function getNetworkType() {
  return (dispatch) => {
    dispatch(setCheckingNetwork(true));
    return getNetwork().then(network => {
      dispatch(setNetwork(network));
      dispatch(setCheckingNetwork(false));
    }).catch(() => {
      dispatch(setNetwork(NO_NETWORK));
      dispatch(setCheckingNetwork(false));
    });
  };
}

export function setNetwork(network) {
  return { type: types.SET_NETWORK, network: network };
}

export function setCheckingNetwork(checkingNetwork) {
  return { type: types.SET_CHECKING_NETWORK, checkingNetwork: checkingNetwork};
}

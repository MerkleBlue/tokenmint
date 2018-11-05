import * as types from './actionTypes';
import { isMainNet } from '../../api/mintApi';

export function checkNetwork() {
  return (dispatch) => {
    dispatch(setCheckingNetwork(true));
    return isMainNet().then(isMainNet => {
      dispatch(setIsMainNet(isMainNet));
      dispatch(setCheckingNetwork(false));
    }).catch(() => {
      dispatch(setIsMainNet(false));
      dispatch(setCheckingNetwork(false));
    });
  };
}

export function setIsMainNet(isMainNet) {
  return { type: types.SET_IS_MAIN_NET, isMainNet: isMainNet };
}

export function setCheckingNetwork(checkingNetwork) {
  return { type: types.SET_CHECKING_NETWORK, checkingNetwork: checkingNetwork};
}

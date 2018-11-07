import appStates from './appStates';

export default {
  tokenName: "",
  tokenSymbol: "",
  decimals: "18",
  tokenOwner: "",
  tokenType: "erc20",
  totalSupply: "",
  accounts: [],
  appState: appStates.INIT,
  checkingTokenOwnerFunds: false,
  tokenOwnerBalance: 0,
  infoMessage: "",
  loadingAccounts: false,
  serviceFee: 0,
  network: "",
  checkingNetwork: true,
  tokenOwnerHasInsufficientFunds: false
};

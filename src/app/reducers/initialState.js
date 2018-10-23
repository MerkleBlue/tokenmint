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
  tokenOwnerHasEnoughFunds: true,
  infoMessage: "",
  loadingAccounts: false,
  serviceFee: 0
};

import appStates from './appStates';

export default {
  tokenName: "",
  tokenSymbol: "",
  decimals: "",
  tokenOwner: "",
  tokenType: "erc20",
  totalSupply: "",
  accounts: [],
  appState: appStates.INIT,
  checkingTokenOwnerFunds: false,
  tokenOwnerHasEnoughFunds: true,
  infoMessage: "",
  loadingAccounts: false
};

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
  checkingPayingAccountFunds: false,
  payingAccountBalance: 0,
  infoMessage: "",
  loadingAccounts: false,
  serviceFee: 0,
  network: "",
  checkingNetwork: true,
  payingAccountHasInsufficientFunds: false,
  isMobileDevice: false,
  walletNeedsToBeUnlocked: false,
  payingAccount: "",
  icoCap: "",
  icoRate: "",
  icoWallet: "",
  icoOpeningTime: "",
  icoClosingTime: ""
};

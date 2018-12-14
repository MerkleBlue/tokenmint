import { expect } from 'chai';
import React from 'react';
import { HandlePaymentPanel } from './HandlePaymentPanel';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

const network = "main";
const payingAccountHasInsufficientFunds = false;
const checkingPayingAccountFunds = false;
const checkingNetwork = false;
const isMobileDevice = false;
const accounts = ["0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"];
const payingAccount = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";
const payingAccountBalance = "0.5";
const serviceFee = "0.2";
const loadingAccounts = false;
const walletNeedsToBeUnlocked = false;
const tokenName = "TestToken";
const tokenSymbol = "TEST";
const decimals = "18";
const totalSupply = "1000";
const tokenType = "erc20";
const tokenOwner = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";

describe("<HandlePaymentPanel /> tests", () => {
  let mount;

  function setup(
    network,
    payingAccountHasInsufficientFunds,
    checkingPayingAccountFunds,
    checkingNetwork,
    isMobileDevice,
    accounts,
    payingAccount,
    payingAccountBalance,
    serviceFee,
    loadingAccounts,
    walletNeedsToBeUnlocked,
    tokenName,
    tokenSymbol,
    decimals,
    totalSupply,
    tokenType,
    tokenOwner,
    setPayingAccount = () => { },
    checkFunds = () => { },
    setPayingAccountHasInsufficientFunds = () => { },
    unlockWallet = () => { },
    createTokens = () => { },
    setAppState = () => { }
  ) {
    const props = {
      network: network,
      payingAccountHasInsufficientFunds: payingAccountHasInsufficientFunds,
      checkingPayingAccountFunds: checkingPayingAccountFunds,
      checkingNetwork: checkingNetwork,
      isMobileDevice: isMobileDevice,
      accounts: accounts,
      payingAccount: payingAccount,
      payingAccountBalance: payingAccountBalance,
      serviceFee: serviceFee,
      loadingAccounts: loadingAccounts,
      walletNeedsToBeUnlocked: walletNeedsToBeUnlocked,
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      decimals: decimals,
      totalSupply: totalSupply,
      tokenType: tokenType,
      tokenOwner: tokenOwner,
      payingAccountActions: { setPayingAccount: setPayingAccount },
      payingAccountFundsActions: { checkFunds: checkFunds, setPayingAccountHasInsufficientFunds: setPayingAccountHasInsufficientFunds },
      walletActions: { unlockWallet: unlockWallet },
      createTokensActions: { createTokens: createTokens },
      appStateActions: { setAppState: setAppState }
    };
    return mount(<HandlePaymentPanel {...props} />);
  }

  before(() => {
    const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
    const { window } = jsdom;
    global.window = window;
    global.document = window.document;
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it("renders HandlePaymentPanel - valid props", () => {
    const wrapper = setup(
      network,
      payingAccountHasInsufficientFunds,
      checkingPayingAccountFunds,
      checkingNetwork,
      isMobileDevice,
      accounts,
      payingAccount,
      payingAccountBalance,
      serviceFee,
      loadingAccounts,
      walletNeedsToBeUnlocked,
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner
    );
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.props().payingAccountHasInsufficientFunds).to.be.false;
    expect(wrapper.props().checkingPayingAccountFunds).to.be.false;
    expect(wrapper.props().checkingNetwork).to.be.false;
    expect(wrapper.props().isMobileDevice).to.be.false;
    expect(wrapper.props().accounts).to.eq(accounts);
    expect(wrapper.props().payingAccount).to.eq(payingAccount);
    expect(wrapper.props().payingAccountBalance).to.eq(payingAccountBalance);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().loadingAccounts).to.be.false;
    expect(wrapper.props().walletNeedsToBeUnlocked).to.be.false;
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq(tokenType);
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
  });

  // it("simulates click on back button", () => {
  //   const setDecimals = sinon.spy();
  //   const setTokenName = sinon.spy();
  //   const setTokenSymbol = sinon.spy();
  //   const setTotalSupply = sinon.spy();
  //   const setTokenType = sinon.spy();
  //   const setTokenOwner = sinon.spy();
  //   const setAppState = sinon.spy();
  //   const setCheckingPayingAccountFunds = sinon.spy();
  //   const setPayingAccountHasInsufficientFunds = sinon.spy();
  //   const setInfoMessage = sinon.spy();
  //   const loadAllAccounts = sinon.spy();
  //   const setServiceFee = sinon.spy();
  //   const setPayingAccountBalance = sinon.spy();
  //   const getNetworkType = sinon.spy();
  //   const wrapper = setup(
  //     infoMessage,
  //     setDecimals,
  //     setTokenName,
  //     setTokenSymbol,
  //     setTotalSupply,
  //     setTokenType,
  //     setTokenOwner,
  //     setAppState,
  //     setCheckingPayingAccountFunds,
  //     setPayingAccountHasInsufficientFunds,
  //     setInfoMessage,
  //     loadAllAccounts,
  //     setServiceFee,
  //     setPayingAccountBalance,
  //     getNetworkType
  //   );
  //   wrapper.find("span").at(1).simulate("click");
  //   expect(setDecimals.calledOnce).to.be.true;
  //   expect(setTokenName.calledOnce).to.be.true;
  //   expect(setTokenSymbol.calledOnce).to.be.true;
  //   expect(setTotalSupply.calledOnce).to.be.true;
  //   expect(setTokenType.calledOnce).to.be.true;
  //   expect(setTokenOwner.calledOnce).to.be.true;
  //   expect(setAppState.calledOnce).to.be.true;
  //   expect(setCheckingPayingAccountFunds.calledOnce).to.be.true;
  //   expect(setPayingAccountHasInsufficientFunds.calledOnce).to.be.true;
  //   expect(setInfoMessage.calledOnce).to.be.true;
  //   expect(loadAllAccounts.calledOnce).to.be.true;
  //   expect(setServiceFee.calledOnce).to.be.true;
  //   expect(setPayingAccountBalance.calledOnce).to.be.true;
  //   expect(getNetworkType.calledOnce).to.be.true;
  // });
});

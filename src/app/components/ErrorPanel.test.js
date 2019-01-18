import { expect } from 'chai';
import React from 'react';
import { ErrorPanel } from './ErrorPanel';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

const infoMessage = "Some error happened!";

describe("<ErrorPanel /> tests", () => {
  let mount;

  function setup(
    infoMessage,
    isMobileDevice = false,
    isIco = false,
    setDecimals = () => { },
    setTokenName = () => { },
    setTokenSymbol = () => { },
    setTotalSupply = () => { },
    setTokenType = () => { },
    setTokenOwner = () => { },
    setAppState = () => { },
    setIcoAppState = () => { },
    setCheckingPayingAccountFunds = () => { },
    setPayingAccountHasInsufficientFunds = () => { },
    setInfoMessage = () => { },
    loadAllAccounts = () => { },
    setServiceFee = () => { },
    setPayingAccountBalance = () => { },
    getNetworkType = () => { },
    setIcoRate = () => { },
    setIcoGoal = () => { },
    setIcoCap = () => { },
    setIcoWallet = () => { },
    setOpeningTime = () => { },
    setClosingTime = () => { },
    setPayingAccount = () => { }
  ) {
    const props = {
      infoMessage: infoMessage,
      isMobileDevice: isMobileDevice,
      isIco: isIco,
      decimalsActions: { setDecimals: setDecimals },
      tokenNameActions: { setTokenName: setTokenName },
      tokenSymbolActions: { setTokenSymbol: setTokenSymbol },
      totalSupplyActions: { setTotalSupply: setTotalSupply },
      tokenTypeActions: { setTokenType: setTokenType },
      tokenOwnerActions: { setTokenOwner: setTokenOwner },
      appStateActions: {
        setAppState: setAppState,
        setIcoAppState: setIcoAppState
      },
      payingAccountFundsActions: {
        setCheckingPayingAccountFunds: setCheckingPayingAccountFunds,
        setPayingAccountHasInsufficientFunds: setPayingAccountHasInsufficientFunds,
        setPayingAccountBalance: setPayingAccountBalance
      },
      infoMessageActions: { setInfoMessage: setInfoMessage },
      accountsActions: { loadAllAccounts: loadAllAccounts },
      serviceFeeActions: { setServiceFee: setServiceFee },
      networkActions: { getNetworkType: getNetworkType },
      icoRateActions: { setIcoRate: setIcoRate },
      icoGoalActions: { setIcoGoal: setIcoGoal },
      icoCapActions: { setIcoCap: setIcoCap },
      icoWalletActions: { setIcoWallet: setIcoWallet },
      icoOpenCloseTimeActions: {
        setOpeningTime: setOpeningTime,
        setClosingTime: setClosingTime
      },
      payingAccountActions: { setPayingAccount: setPayingAccount }
    };
    return mount(<ErrorPanel {...props} />);
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

  it("renders ErrorPanel", () => {
    const wrapper = setup(infoMessage);
    expect(wrapper.props().infoMessage).to.eq(infoMessage);
    expect(wrapper.props().decimalsActions).to.exist;
    expect(wrapper.props().tokenNameActions).to.exist;
    expect(wrapper.props().tokenSymbolActions).to.exist;
    expect(wrapper.props().totalSupplyActions).to.exist;
    expect(wrapper.props().tokenTypeActions).to.exist;
    expect(wrapper.props().tokenOwnerActions).to.exist;
    expect(wrapper.props().appStateActions).to.exist;
    expect(wrapper.props().payingAccountFundsActions).to.exist;
    expect(wrapper.props().infoMessageActions).to.exist;
    expect(wrapper.props().accountsActions).to.exist;
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Oops, Something Went Wrong!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(2);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography_error_info_message");
    expect(wrapper.find("Typography").at(1).props().children).to.eq(infoMessage);
    expect(wrapper.find("span").length).to.eq(2);
    expect(wrapper.find("span").at(1).props().className).to.eq("btn btn-err-back wow fadeInUp");
  });

  it("simulates click on back button - mint tokens mode", () => {
    const setDecimals = sinon.spy();
    const setTokenName = sinon.spy();
    const setTokenSymbol = sinon.spy();
    const setTotalSupply = sinon.spy();
    const setTokenType = sinon.spy();
    const setTokenOwner = sinon.spy();
    const setAppState = sinon.spy();
    const setIcoAppState = sinon.spy();
    const setCheckingPayingAccountFunds = sinon.spy();
    const setPayingAccountHasInsufficientFunds = sinon.spy();
    const setInfoMessage = sinon.spy();
    const loadAllAccounts = sinon.spy();
    const setServiceFee = sinon.spy();
    const setPayingAccountBalance = sinon.spy();
    const getNetworkType = sinon.spy();
    const setIcoRate = sinon.spy();
    const setIcoGoal = sinon.spy();
    const setIcoCap = sinon.spy();
    const setIcoWallet = sinon.spy();
    const setOpeningTime = sinon.spy();
    const setClosingTime = sinon.spy();
    const setPayingAccount = sinon.spy();
    const wrapper = setup(
      infoMessage,
      false,
      false,
      setDecimals,
      setTokenName,
      setTokenSymbol,
      setTotalSupply,
      setTokenType,
      setTokenOwner,
      setAppState,
      setIcoAppState,
      setCheckingPayingAccountFunds,
      setPayingAccountHasInsufficientFunds,
      setInfoMessage,
      loadAllAccounts,
      setServiceFee,
      setPayingAccountBalance,
      getNetworkType,
      setIcoRate,
      setIcoGoal,
      setIcoCap,
      setIcoWallet,
      setOpeningTime,
      setClosingTime,
      setPayingAccount
    );
    wrapper.find("span").at(1).simulate("click");
    expect(setDecimals.calledOnce).to.be.true;
    expect(setTokenName.calledOnce).to.be.true;
    expect(setTokenSymbol.calledOnce).to.be.true;
    expect(setTotalSupply.calledOnce).to.be.true;
    expect(setTokenType.calledOnce).to.be.true;
    expect(setTokenOwner.calledOnce).to.be.true;
    expect(setAppState.calledOnce).to.be.true;
    expect(setCheckingPayingAccountFunds.calledOnce).to.be.true;
    expect(setPayingAccountHasInsufficientFunds.calledOnce).to.be.true;
    expect(setInfoMessage.calledOnce).to.be.true;
    expect(loadAllAccounts.calledOnce).to.be.true;
    expect(setServiceFee.calledOnce).to.be.true;
    expect(setPayingAccountBalance.calledOnce).to.be.true;
    expect(getNetworkType.calledOnce).to.be.true;
    expect(setPayingAccount.calledOnce).to.be.true;

    expect(setIcoRate.calledOnce).to.be.false;
    expect(setIcoGoal.calledOnce).to.be.false;
    expect(setIcoCap.calledOnce).to.be.false;
    expect(setIcoWallet.calledOnce).to.be.false;
    expect(setOpeningTime.calledOnce).to.be.false;
    expect(setClosingTime.calledOnce).to.be.false;
    expect(setIcoAppState.calledOnce).to.be.false;
  });

  it("simulates click on back button - ICO mode", () => {
    const setDecimals = sinon.spy();
    const setTokenName = sinon.spy();
    const setTokenSymbol = sinon.spy();
    const setTotalSupply = sinon.spy();
    const setTokenType = sinon.spy();
    const setTokenOwner = sinon.spy();
    const setAppState = sinon.spy();
    const setIcoAppState = sinon.spy();
    const setCheckingPayingAccountFunds = sinon.spy();
    const setPayingAccountHasInsufficientFunds = sinon.spy();
    const setInfoMessage = sinon.spy();
    const loadAllAccounts = sinon.spy();
    const setServiceFee = sinon.spy();
    const setPayingAccountBalance = sinon.spy();
    const getNetworkType = sinon.spy();
    const setIcoRate = sinon.spy();
    const setIcoGoal = sinon.spy();
    const setIcoCap = sinon.spy();
    const setIcoWallet = sinon.spy();
    const setOpeningTime = sinon.spy();
    const setClosingTime = sinon.spy();
    const setPayingAccount = sinon.spy();
    const wrapper = setup(
      infoMessage,
      false,
      true,
      setDecimals,
      setTokenName,
      setTokenSymbol,
      setTotalSupply,
      setTokenType,
      setTokenOwner,
      setAppState,
      setIcoAppState,
      setCheckingPayingAccountFunds,
      setPayingAccountHasInsufficientFunds,
      setInfoMessage,
      loadAllAccounts,
      setServiceFee,
      setPayingAccountBalance,
      getNetworkType,
      setIcoRate,
      setIcoGoal,
      setIcoCap,
      setIcoWallet,
      setOpeningTime,
      setClosingTime,
      setPayingAccount
    );
    wrapper.find("span").at(1).simulate("click");
    expect(setDecimals.calledOnce).to.be.true;
    expect(setTokenName.calledOnce).to.be.true;
    expect(setCheckingPayingAccountFunds.calledOnce).to.be.true;
    expect(setPayingAccountHasInsufficientFunds.calledOnce).to.be.true;
    expect(setInfoMessage.calledOnce).to.be.true;
    expect(loadAllAccounts.calledOnce).to.be.true;
    expect(setServiceFee.calledOnce).to.be.true;
    expect(setPayingAccountBalance.calledOnce).to.be.true;
    expect(getNetworkType.calledOnce).to.be.true;
    expect(setPayingAccount.calledOnce).to.be.true;
    expect(setIcoRate.calledOnce).to.be.true;
    expect(setIcoGoal.calledOnce).to.be.true;
    expect(setIcoCap.calledOnce).to.be.true;
    expect(setIcoWallet.calledOnce).to.be.true;
    expect(setOpeningTime.calledOnce).to.be.true;
    expect(setClosingTime.calledOnce).to.be.true;
    expect(setIcoAppState.calledOnce).to.be.true;
    expect(setTokenSymbol.calledOnce).to.be.true;

    expect(setAppState.calledOnce).to.be.false;
    expect(setTokenOwner.calledOnce).to.be.false;
    expect(setTokenType.calledOnce).to.be.false;
    expect(setTotalSupply.calledOnce).to.be.false;
  });
});

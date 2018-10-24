import { expect } from 'chai';
import React from 'react';
import { ConfirmationPanel } from './ConfirmationPanel';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import initialState from '../reducers/initialState';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

const tokenName = "The First Amendment";
const tokenSymbol = "TFA";
const decimals = "18";
const totalSupply = "1000";
const tokenType = "erc20";
const tokenOwner = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";
const checkingTokenOwnerFunds = false;
const tokenOwnerHasEnoughFunds = true;
const loadingAccounts = false;
const serviceFee = 0.5;

describe("<ConfirmationPanel /> tests", () => {
  let mount;

  function setup(
    tokenName,
    tokenSymbol,
    decimals,
    totalSupply,
    tokenType,
    tokenOwner,
    checkingTokenOwnerFunds,
    tokenOwnerHasEnoughFunds,
    loadingAccounts,
    serviceFee,
    setAppState = () => { },
    setInfoMessage = () => { },
    createTokens = () => { },
    setServiceFee = () => { }
  ) {
    const props = {
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      decimals: decimals,
      totalSupply: totalSupply,
      tokenType: tokenType,
      tokenOwner: tokenOwner,
      checkingTokenOwnerFunds: checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds: tokenOwnerHasEnoughFunds,
      loadingAccounts: loadingAccounts,
      serviceFee: serviceFee,
      appStateActions: { setAppState: setAppState },
      infoMessageActions: { setInfoMessage: setInfoMessage },
      createTokensActions: { createTokens: createTokens },
      serviceFeeActions: { setServiceFee: setServiceFee }
    };
    return mount(<ConfirmationPanel {...props} />);
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

  it("renders ConfirmationPanel non existing token name", () => {
    const wrapper = setup(
      initialState.tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds,
      loadingAccounts,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.be.empty;
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(15);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(initialState.tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(14).props().children).to.eq("99.99$ (0.5 ETH). Mining fee excluded.");
  });

  it("renders ConfirmationPanel non existing token symbol", () => {
    const wrapper = setup(
      tokenName,
      initialState.tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds,
      loadingAccounts,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(initialState.tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(15);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(initialState.tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(14).props().children).to.eq("99.99$ (0.5 ETH). Mining fee excluded.");
  });

  it("renders ConfirmationPanel non existing decimals", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      "",
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds,
      loadingAccounts,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.be.empty;
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(15);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq("");
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(14).props().children).to.eq("99.99$ (0.5 ETH). Mining fee excluded.");
  });

  it("renders ConfirmationPanel non existing total supply", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      initialState.totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds,
      loadingAccounts,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(initialState.totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(15);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(initialState.totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(14).props().children).to.eq("99.99$ (0.5 ETH). Mining fee excluded.");
  });

  it("renders ConfirmationPanel non existing token owner", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      initialState.tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds,
      loadingAccounts,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(initialState.tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(15);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(initialState.tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("99.99$ (0.5 ETH). Mining fee excluded.");
  });

  it("renders ConfirmationPanel while checking token owner funds", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      true,
      tokenOwnerHasEnoughFunds,
      loadingAccounts,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.be.true;
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(15);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("99.99$ (0.5 ETH). Mining fee excluded.");
  });

  it("renders ConfirmationPanel - token owner with insufficient funds", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      false,
      loadingAccounts,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.be.false;
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(15);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("99.99$ (0.5 ETH). Mining fee excluded.");
  });

  it("renders ConfirmationPanel while loading accounts", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds,
      true,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.be.true;
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(15);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("99.99$ (0.5 ETH). Mining fee excluded.");
  });

  it("renders ConfirmationPanel while calculating service fee", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds,
      loadingAccounts,
      0
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(0);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(15);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("Calculating...");
  });

  it("renders ConfirmationPanel with invalid service fee", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds,
      loadingAccounts,
      -1
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(-1);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(15);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("Unavailable. Please make sure you are connected to the wallet and refresh the page.");
  });

  it("renders ConfirmationPanel with valid props", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds,
      loadingAccounts,
      serviceFee
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(15);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("99.99$ (0.5 ETH). Mining fee excluded.");
  });

  it("simulates click on cancel button", () => {
    const setAppState = sinon.spy();
    const setInfoMessage = sinon.spy();
    const createTokens = sinon.spy();
    const setServiceFee = sinon.spy();
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds,
      loadingAccounts,
      serviceFee,
      setAppState,
      setInfoMessage,
      createTokens,
      setServiceFee
    );
    wrapper.find("span").at(1).simulate("click");
    expect(setAppState.calledOnce).to.be.true;
    expect(setInfoMessage.calledOnce).to.be.true;
    expect(setServiceFee.calledOnce).to.be.true;
  });

  it("simulates click on confirm button - invalid props", () => {
    const setAppState = sinon.spy();
    const setInfoMessage = sinon.spy();
    const createTokens = sinon.spy();
    const wrapper = setup(
      initialState.tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds,
      loadingAccounts,
      serviceFee,
      setAppState,
      setInfoMessage,
      createTokens
    );
    wrapper.find("span").at(2).simulate("click");
    expect(createTokens.calledOnce).to.be.false;
  });

  it("simulates click on confirm button - valid props", () => {
    const setAppState = sinon.spy();
    const setInfoMessage = sinon.spy();
    const createTokens = sinon.spy();
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasEnoughFunds,
      loadingAccounts,
      serviceFee,
      setAppState,
      setInfoMessage,
      createTokens
    );
    wrapper.find("span").at(2).simulate("click");
    expect(createTokens.calledOnce).to.be.true;
  });
});

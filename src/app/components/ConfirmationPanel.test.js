import { expect } from 'chai';
import React from 'react';
import { ConfirmationPanel } from './ConfirmationPanel';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import initialState from '../reducers/initialState';
import sinon from 'sinon';
import {NO_NETWORK} from '../../api/mintApi';

Enzyme.configure({ adapter: new Adapter() });

const tokenName = "The First Amendment";
const tokenSymbol = "TFA";
const decimals = "18";
const totalSupply = "1000";
const tokenType = "erc20";
const tokenOwner = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";
const checkingTokenOwnerFunds = false;
const tokenOwnerHasInsufficientFunds = false;
const loadingAccounts = false;
const serviceFee = 0.5;
const network = "main";

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
    tokenOwnerHasInsufficientFunds,
    loadingAccounts,
    serviceFee,
    network,
    setAppState = () => { },
    setInfoMessage = () => { },
    createTokens = () => { },
    getNetworkType = () => { },
    checkFunds = () => { }
  ) {
    const props = {
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      decimals: decimals,
      totalSupply: totalSupply,
      tokenType: tokenType,
      tokenOwner: tokenOwner,
      checkingTokenOwnerFunds: checkingTokenOwnerFunds,
      tokenOwnerHasInsufficientFunds: tokenOwnerHasInsufficientFunds,
      loadingAccounts: loadingAccounts,
      serviceFee: serviceFee,
      network: network,
      appStateActions: { setAppState: setAppState },
      infoMessageActions: { setInfoMessage: setInfoMessage },
      createTokensActions: { createTokens: createTokens },
      networkActions: { getNetworkType: getNetworkType },
      tokenOwnerFundsActions: { checkFunds: checkFunds }
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
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      serviceFee,
      network
    );
    expect(wrapper.props().tokenName).to.be.empty;
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(initialState.tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(14).props().children).to.eq("29.99$ (0.50000000 ETH)");
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
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      serviceFee,
      network
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(initialState.tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(initialState.tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(14).props().children).to.eq("29.99$ (0.50000000 ETH)");
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
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      serviceFee,
      network
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.be.empty;
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq("");
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(14).props().children).to.eq("29.99$ (0.50000000 ETH)");
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
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      serviceFee,
      network
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(initialState.totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(initialState.totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq(tokenType);
    expect(wrapper.find("Typography").at(14).props().children).to.eq("29.99$ (0.50000000 ETH)");
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
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      serviceFee,
      network
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(initialState.tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(initialState.tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("29.99$ (0.50000000 ETH)");
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
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      serviceFee,
      network
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.be.true;
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("29.99$ (0.50000000 ETH)");
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
      true,
      loadingAccounts,
      serviceFee,
      network
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.be.true;
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("29.99$ (0.50000000 ETH)");
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
      tokenOwnerHasInsufficientFunds,
      true,
      serviceFee,
      network
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.be.true;
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("29.99$ (0.50000000 ETH)");
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
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      0,
      network
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(0);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
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
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      -1,
      network
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(-1);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("Unavailable. Please make sure you are connected to the wallet and refresh the page.");
  });

  it("renders ConfirmationPanel with no network", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      serviceFee,
      NO_NETWORK
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.props().network).to.eq(NO_NETWORK);
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm-disabled wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("29.99$ (0.50000000 ETH)");
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
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      serviceFee,
      network
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().infoMessageActions).to.not.be.empty;
    expect(wrapper.props().createTokensActions).to.not.be.empty;
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(3);
    expect(wrapper.find("span").at(2).props().className).to.eq("btn btn-confirm wow fadeInUp");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Please Confirm Token Creation Parameters!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(17);
    expect(wrapper.find("Typography").at(2).props().children).to.eq(tokenOwner);
    expect(wrapper.find("Typography").at(4).props().children).to.eq(tokenName);
    expect(wrapper.find("Typography").at(6).props().children).to.eq(tokenSymbol);
    expect(wrapper.find("Typography").at(8).props().children).to.eq(decimals);
    expect(wrapper.find("Typography").at(10).props().children).to.eq(totalSupply);
    expect(wrapper.find("Typography").at(12).props().children).to.eq("erc20");
    expect(wrapper.find("Typography").at(14).props().children).to.eq("29.99$ (0.50000000 ETH)");
  });

  it("simulates click on cancel button", () => {
    const setAppState = sinon.spy();
    const setInfoMessage = sinon.spy();
    const createTokens = sinon.spy();
    const getNetworkType = sinon.spy();
    const checkFunds = sinon.spy();
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
      tokenOwner,
      checkingTokenOwnerFunds,
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      serviceFee,
      network,
      setAppState,
      setInfoMessage,
      createTokens,
      getNetworkType,
      checkFunds
    );
    wrapper.find("span").at(1).simulate("click");
    expect(setAppState.calledOnce).to.be.true;
    expect(setInfoMessage.calledOnce).to.be.true;
    expect(checkFunds.calledOnce).to.be.true;
    expect(getNetworkType.calledOnce).to.be.true;
    expect(createTokens.calledOnce).to.be.false;
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
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      serviceFee,
      network,
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
      tokenOwnerHasInsufficientFunds,
      loadingAccounts,
      serviceFee,
      network,
      setAppState,
      setInfoMessage,
      createTokens
    );
    wrapper.find("span").at(2).simulate("click");
    expect(createTokens.calledOnce).to.be.true;
  });
});

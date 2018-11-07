import { expect } from 'chai';
import React from 'react';
import { Footer } from './Footer';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';
import initialState from '../reducers/initialState';
import { NO_NETWORK } from '../../api/mintApi';

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

describe("<Footer /> tests", () => {
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
    setAppState = () => { }
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
    };
    return mount(<Footer {...props} />);
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

  it("renders Footer non existing token name", () => {
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
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled wow fadeInUp");
  });

  it("renders Footer non existing token symbol", () => {
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
    expect(wrapper.props().tokenSymbol).to.be.empty;
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled wow fadeInUp");
  });

  it("renders Footer invalid decimals", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      "-1",
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
    expect(wrapper.props().decimals).to.eq("-1");
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled wow fadeInUp");
  });

  it("renders Footer invalid decimals", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      "0",
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
    expect(wrapper.props().totalSupply).to.eq("0");
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.eq(tokenOwnerHasInsufficientFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled wow fadeInUp");
  });

  it("renders Footer while checking token owner funds", () => {
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
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled wow fadeInUp");
  });

  it("renders Footer token owner with insufficient funds", () => {
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
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled wow fadeInUp");
  });

  it("renders Footer while loading accounts", () => {
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
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled wow fadeInUp");
  });

  it("renders Footer with invalid fee", () => {
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
    expect(wrapper.props().loadingAccounts).to.be.false;
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFee).to.eq(-1);
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled wow fadeInUp");
  });

  it("renders Footer with no network", () => {
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
    expect(wrapper.props().loadingAccounts).to.be.false;
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().network).to.eq(NO_NETWORK);
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled wow fadeInUp");
  });

  it("renders Footer with valid props", () => {
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
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().network).to.eq(network);
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-common wow fadeInUp");
  });

  it("simulates click on disabled button", () => {
    const setAppState = sinon.spy();
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
      setAppState
    );
    wrapper.find("span").simulate("click");
    expect(setAppState.calledOnce).to.be.false;
  });

  it("simulates click on disabled button", () => {
    const setAppState = sinon.spy();
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
      setAppState
    );
    wrapper.find("span").simulate("click");
    expect(setAppState.calledOnce).to.be.true;
  });
});

import { expect } from 'chai';
import React from 'react';
import { Footer } from './Footer';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';
import initialState from '../reducers/initialState';

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
    tokenOwnerHasEnoughFunds,
    loadingAccounts,
    setAppState = () => { },
    calculateServiceFee = () => { }
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
      appStateActions: { setAppState: setAppState },
      serviceFeeActions: { calculateServiceFee: calculateServiceFee }
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
      tokenOwnerHasEnoughFunds,
      loadingAccounts
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
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFeeActions).to.not.be.empty;
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
      tokenOwnerHasEnoughFunds,
      loadingAccounts
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.be.empty;
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFeeActions).to.not.be.empty;
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
      tokenOwnerHasEnoughFunds,
      loadingAccounts
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq("-1");
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFeeActions).to.not.be.empty;
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
      tokenOwnerHasEnoughFunds,
      loadingAccounts
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq("0");
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().checkingTokenOwnerFunds).to.eq(checkingTokenOwnerFunds);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.eq(tokenOwnerHasEnoughFunds);
    expect(wrapper.props().loadingAccounts).to.eq(loadingAccounts);
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFeeActions).to.not.be.empty;
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
      tokenOwnerHasEnoughFunds,
      loadingAccounts
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
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFeeActions).to.not.be.empty;
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
      false,
      loadingAccounts
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
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFeeActions).to.not.be.empty;
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
      tokenOwnerHasEnoughFunds,
      true
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
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFeeActions).to.not.be.empty;
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
      tokenOwnerHasEnoughFunds,
      loadingAccounts
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
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.props().serviceFeeActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-common wow fadeInUp");
  });

  it("simulates click on disabled button", () => {
    const setAppState = sinon.spy();
    const calculateServiceFee = sinon.spy();
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
      setAppState,
      calculateServiceFee
    );
    wrapper.find("span").simulate("click");
    expect(setAppState.calledOnce).to.be.false;
    expect(calculateServiceFee.calledOnce).to.be.false;
  });

  it("simulates click on disabled button", () => {
    const setAppState = sinon.spy();
    const calculateServiceFee = sinon.spy();
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
      setAppState,
      calculateServiceFee
    );
    wrapper.find("span").simulate("click");
    expect(setAppState.calledOnce).to.be.true;
    expect(calculateServiceFee.calledOnce).to.be.true;
  });
});

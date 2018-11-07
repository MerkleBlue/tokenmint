import { expect } from 'chai';
import React from 'react';
import { TokenOwner } from './TokenOwner';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import initialState from '../reducers/initialState';

const tokenOwnerHasInsufficientFunds = false;
const checkingTokenOwnerFunds = false;
const checkingNetwork = false;
const loadingAccounts = false;
const tokenOwner = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";
const tokenOwnerBalance = 0.5;
const serviceFee = 0.25;
function generateAccounts(accountsCount) {
  const accounts = [];
  for (let i = 0; i < accountsCount; i++) {
    accounts.push("Account" + i);
  }
  return accounts;
}

Enzyme.configure({ adapter: new Adapter() });

describe("<TokenOwner /> tests", () => {
  let mount;

  function setup(
    tokenOwnerHasInsufficientFunds,
    checkingTokenOwnerFunds,
    checkingNetwork,
    accounts,
    tokenOwner,
    loadingAccounts,
    tokenOwnerBalance,
    serviceFee,
    setTokenOwner = () => { },
    checkFunds = () => { }
  ) {
    const props = {
      checkingNetwork: checkingNetwork,
      accounts: accounts,
      tokenOwner: tokenOwner,
      tokenOwnerHasInsufficientFunds: tokenOwnerHasInsufficientFunds,
      checkingTokenOwnerFunds: checkingTokenOwnerFunds,
      loadingAccounts: loadingAccounts,
      tokenOwnerBalance: tokenOwnerBalance,
      serviceFee: serviceFee,
      tokenOwnerActions: { setTokenOwner: setTokenOwner },
      tokenOwnerFundsActions: { checkFunds: checkFunds }
    };
    return mount(<TokenOwner {...props} />);
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

  it("renders TokenOwner without accounts", () => {
    const wrapper = setup(
      tokenOwnerHasInsufficientFunds,
      checkingTokenOwnerFunds,
      checkingNetwork,
      initialState.accounts,
      initialState.tokenOwner,
      loadingAccounts,
      tokenOwnerBalance,
      serviceFee
    );
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.be.false;
    expect(wrapper.props().checkingTokenOwnerFunds).to.be.false;
    expect(wrapper.props().checkingNetwork).to.be.false;
    expect(wrapper.props().accounts).to.be.empty;
    expect(wrapper.props().tokenOwner).to.be.empty;
    expect(wrapper.props().loadingAccounts).to.be.false;
    expect(wrapper.props().tokenOwnerBalance).to.eq(tokenOwnerBalance);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Token Owner");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Select account");
    expect(wrapper.find("Select").length).to.eq(1);
    expect(wrapper.find("Select").props().error).to.be.true;
    expect(wrapper.find("Select").props().value).to.be.empty;
    expect(wrapper.find("Typography").length).to.eq(2);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography_error");
    expect(wrapper.find("Typography").at(1).props().children[0]).to.eq("There are no available accounts. " +
      "Please make sure that you run Metamask or any other Ethereum wallet with at least one account, and refresh the page. You can download Metamask at");
    expect(wrapper.find("a").length).to.eq(1);
    expect(wrapper.find("a").props().href).to.eq("https://metamask.io/");
  });

  it("renders TokenOwner while loading accounts", () => {
    const wrapper = setup(
      tokenOwnerHasInsufficientFunds,
      checkingTokenOwnerFunds,
      checkingNetwork,
      initialState.accounts,
      initialState.tokenOwner,
      true,
      tokenOwnerBalance,
      serviceFee
    );
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.be.false;
    expect(wrapper.props().checkingTokenOwnerFunds).to.be.false;
    expect(wrapper.props().checkingNetwork).to.be.false;
    expect(wrapper.props().accounts).to.be.empty;
    expect(wrapper.props().tokenOwner).to.be.empty;
    expect(wrapper.props().loadingAccounts).to.be.true;
    expect(wrapper.props().tokenOwnerBalance).to.eq(tokenOwnerBalance);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Token Owner");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Select account");
    expect(wrapper.find("Select").length).to.eq(1);
    expect(wrapper.find("Select").props().error).to.be.false;
    expect(wrapper.find("Select").props().value).to.be.empty;
    expect(wrapper.find("Typography").length).to.eq(2);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(1).props().children[0]).to.eq("ETH address (not exchange address). " +
      "This address will be owner of the token!");
    expect(wrapper.find("a").length).to.eq(0);
  });

  it("renders TokenOwner with insufficient funds", () => {
    const wrapper = setup(
      true,
      checkingTokenOwnerFunds,
      checkingNetwork,
      [tokenOwner],
      tokenOwner,
      loadingAccounts,
      tokenOwnerBalance,
      serviceFee
    );
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.be.true;
    expect(wrapper.props().checkingTokenOwnerFunds).to.be.false;
    expect(wrapper.props().checkingNetwork).to.be.false;
    expect(wrapper.props().accounts.length).to.eq(1);
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().loadingAccounts).to.be.false;
    expect(wrapper.props().tokenOwnerBalance).to.eq(tokenOwnerBalance);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Token Owner");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Select account");
    expect(wrapper.find("Select").length).to.eq(1);
    expect(wrapper.find("Select").props().error).to.be.true;
    expect(wrapper.find("Select").props().value).to.eq(tokenOwner);
    expect(wrapper.find("Typography").length).to.eq(4);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography_error");
    expect(wrapper.find("Typography").at(1).props().children[0]).to.eq("This account has insufficient funds. " +
      "Please top up this account, or select another one, and refresh the page.");
    expect(wrapper.find("Typography").at(2).props().children[2]).to.eq(tokenOwnerBalance);
    expect(wrapper.find("Typography").at(3).props().children[2]).to.eq(serviceFee);
    expect(wrapper.find("a").length).to.eq(0);
  });

  it("renders TokenOwner with multiple accounts", () => {
    const accounts = generateAccounts(3);
    const wrapper = setup(
      tokenOwnerHasInsufficientFunds,
      checkingTokenOwnerFunds,
      checkingNetwork,
      accounts,
      accounts[0],
      loadingAccounts,
      tokenOwnerBalance,
      serviceFee
    );
    expect(wrapper.props().tokenOwnerHasInsufficientFunds).to.be.false;
    expect(wrapper.props().checkingTokenOwnerFunds).to.be.false;
    expect(wrapper.props().checkingNetwork).to.be.false;
    expect(wrapper.props().accounts.length).to.eq(3);
    expect(wrapper.props().tokenOwner).to.eq(accounts[0]);
    expect(wrapper.props().loadingAccounts).to.be.false;
    expect(wrapper.props().tokenOwnerBalance).to.eq(tokenOwnerBalance);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Token Owner");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Select account");
    expect(wrapper.find("Select").length).to.eq(1);
    expect(wrapper.find("Select").props().error).to.be.false;
    expect(wrapper.find("Select").props().value).to.eq(accounts[0]);
    expect(wrapper.find("Typography").length).to.eq(2);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(1).props().children[0]).to.eq("ETH address (not exchange address). " +
      "This address will be owner of the token!");
    expect(wrapper.find("a").length).to.eq(0);
  });
});

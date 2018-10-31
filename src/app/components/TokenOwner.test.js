import { expect } from 'chai';
import React from 'react';
import { TokenOwner } from './TokenOwner';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import initialState from '../reducers/initialState';

const tokenOwner = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";
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
    accounts,
    tokenOwner,
    tokenOwnerHasEnoughFunds,
    loadingAccounts,
    setTokenOwner = () => { },
    checkFunds = () => { }
  ) {
    const props = {
      accounts: accounts,
      tokenOwner: tokenOwner,
      tokenOwnerHasEnoughFunds: tokenOwnerHasEnoughFunds,
      loadingAccounts: loadingAccounts,
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
    const wrapper = setup(initialState.accounts, initialState.tokenOwner, true, false);
    expect(wrapper.props().accounts).to.be.empty;
    expect(wrapper.props().tokenOwner).to.be.empty;
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.be.true;
    expect(wrapper.props().loadingAccounts).to.be.false;
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
      "Please make sure that you run Metamask or any other Ethereum wallet with at least one account, and refresh the page. You can download metamask at");
    expect(wrapper.find("a").length).to.eq(1);
    expect(wrapper.find("a").props().href).to.eq("https://metamask.io/");
  });

  it("renders TokenOwner while loading accounts", () => {
    const wrapper = setup(initialState.accounts, initialState.tokenOwner, true, true);
    expect(wrapper.props().accounts).to.be.empty;
    expect(wrapper.props().tokenOwner).to.be.empty;
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.be.true;
    expect(wrapper.props().loadingAccounts).to.be.true;
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
      "This address will be owner of the token. Please make sure that the selected address is main-net Ethereum address!");
    expect(wrapper.find("a").length).to.eq(0);
  });

  it("renders TokenOwner with insufficient funds", () => {
    const wrapper = setup([tokenOwner], tokenOwner, false, false);
    expect(wrapper.props().accounts).to.not.be.empty;
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.be.false;
    expect(wrapper.props().loadingAccounts).to.be.false;
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Token Owner");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Select account");
    expect(wrapper.find("Select").length).to.eq(1);
    expect(wrapper.find("Select").props().error).to.be.true;
    expect(wrapper.find("Select").props().value).to.eq(tokenOwner);
    expect(wrapper.find("Typography").length).to.eq(2);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography_error");
    expect(wrapper.find("Typography").at(1).props().children[0]).to.eq("This account has insufficient funds. " +
      "Please top up this account, or select another one.");
    expect(wrapper.find("a").length).to.eq(0);
  });

  it("renders TokenOwner with multiple accounts", () => {
    const accounts = generateAccounts(3);
    const wrapper = setup(accounts, accounts[0], true, false);
    expect(wrapper.props().accounts).to.not.be.empty;
    expect(wrapper.props().tokenOwner).to.eq(accounts[0]);
    expect(wrapper.props().tokenOwnerHasEnoughFunds).to.be.true;
    expect(wrapper.props().loadingAccounts).to.be.false;
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
      "This address will be owner of the token. Please make sure that the selected address is main-net Ethereum address!");
    expect(wrapper.find("a").length).to.eq(0);
  });
});

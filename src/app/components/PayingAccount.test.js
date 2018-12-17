import { expect } from 'chai';
import React from 'react';
import { PayingAccount } from './PayingAccount';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import initialState from '../reducers/initialState';

Enzyme.configure({ adapter: new Adapter() });

const payingAccount = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";
const accounts = ["0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"];
const loadingAccounts = false;
const checkingPayingAccountFunds = false;
const payingAccountHasInsufficientFunds = false;
const payingAccountBalance = 0.5;
const serviceFee = 0.25;

describe("<PayingAccount /> tests", () => {
  let mount;

  function setup(
    payingAccount,
    accounts,
    loadingAccounts,
    checkingPayingAccountFunds,
    payingAccountHasInsufficientFunds,
    payingAccountBalance,
    serviceFee,
    initTokenOwner = () => { },
    setPayingAccount = () => { },
    checkFunds = () => { },
    setPayingAccountHasInsufficientFunds = () => { }
  ) {
    const props = {
      payingAccount: payingAccount,
      accounts: accounts,
      loadingAccounts: loadingAccounts,
      checkingPayingAccountFunds: checkingPayingAccountFunds,
      payingAccountHasInsufficientFunds: payingAccountHasInsufficientFunds,
      payingAccountBalance: payingAccountBalance,
      serviceFee: serviceFee,
      tokenOwnerActions: { initTokenOwner: initTokenOwner },
      payingAccountActions: { setPayingAccount: setPayingAccount },
      payingAccountFundsActions: { checkFunds: checkFunds, setPayingAccountHasInsufficientFunds }
    };
    return mount(<PayingAccount {...props} />);
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

  it("renders PayingAccount - empty paying account", () => {
    const wrapper = setup(
      initialState.payingAccount,
      accounts,
      loadingAccounts,
      checkingPayingAccountFunds,
      payingAccountHasInsufficientFunds,
      payingAccountBalance,
      serviceFee
    );
    expect(wrapper.props().payingAccount).to.be.empty;
    expect(wrapper.props().accounts).to.eq(accounts);
    expect(wrapper.props().loadingAccounts).to.be.false;
    expect(wrapper.props().checkingPayingAccountFunds).to.be.false;
    expect(wrapper.props().payingAccountHasInsufficientFunds).to.be.false;
    expect(wrapper.props().payingAccountBalance).to.eq(payingAccountBalance);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().tokenOwnerActions).to.exist;
    expect(wrapper.props().payingAccountActions).to.exist;
    expect(wrapper.props().payingAccountFundsActions).to.exist;
    expect(wrapper.find("FormControl").length).to.eq(1);
    expect(wrapper.find("FormControl").props().variant).to.eq("outlined");
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Paying Account");
    expect(wrapper.find("Select").length).to.eq(1);
    expect(wrapper.find("Select").props().error).to.be.false;
    expect(wrapper.find("Select").props().value).to.be.empty;
    expect(wrapper.find("OutlinedInput").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(1);
    expect(wrapper.find("Typography").props().align).to.eq("left");
    expect(wrapper.find("Typography").props().variant).to.eq("body1");
    expect(wrapper.find("Typography").props().className).to.eq("typography_payment");
    expect(wrapper.find("Typography").props().children).to.eq("This account pays for token creation service.");
  });

  it("renders PayingAccount - no accounts", () => {
    const wrapper = setup(
      initialState.payingAccount,
      initialState.accounts,
      loadingAccounts,
      checkingPayingAccountFunds,
      payingAccountHasInsufficientFunds,
      payingAccountBalance,
      serviceFee
    );
    expect(wrapper.props().payingAccount).to.be.empty;
    expect(wrapper.props().accounts).to.be.empty;
    expect(wrapper.props().loadingAccounts).to.be.false;
    expect(wrapper.props().checkingPayingAccountFunds).to.be.false;
    expect(wrapper.props().payingAccountHasInsufficientFunds).to.be.false;
    expect(wrapper.props().payingAccountBalance).to.eq(payingAccountBalance);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().tokenOwnerActions).to.exist;
    expect(wrapper.props().payingAccountActions).to.exist;
    expect(wrapper.props().payingAccountFundsActions).to.exist;
    expect(wrapper.find("FormControl").length).to.eq(1);
    expect(wrapper.find("FormControl").props().variant).to.eq("outlined");
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Paying Account");
    expect(wrapper.find("Select").length).to.eq(1);
    expect(wrapper.find("Select").props().error).to.be.true;
    expect(wrapper.find("Select").props().value).to.be.empty;
    expect(wrapper.find("OutlinedInput").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(1);
    expect(wrapper.find("Typography").props().align).to.eq("left");
    expect(wrapper.find("Typography").props().variant).to.eq("body1");
    expect(wrapper.find("Typography").props().className).to.eq("typography_payment_error");
    expect(wrapper.find("Typography").props().children).to.eq("There are no available accounts. " +
      "Please make sure that you run Metamask or any other Ethereum wallet with at least one UNLOCKED account, and refresh the page.");
  });

  it("renders PayingAccount - while loading accounts", () => {
    const wrapper = setup(
      initialState.payingAccount,
      initialState.accounts,
      true,
      checkingPayingAccountFunds,
      payingAccountHasInsufficientFunds,
      payingAccountBalance,
      serviceFee
    );
    expect(wrapper.props().payingAccount).to.be.empty;
    expect(wrapper.props().accounts).to.be.empty;
    expect(wrapper.props().loadingAccounts).to.be.true;
    expect(wrapper.props().checkingPayingAccountFunds).to.be.false;
    expect(wrapper.props().payingAccountHasInsufficientFunds).to.be.false;
    expect(wrapper.props().payingAccountBalance).to.eq(payingAccountBalance);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().tokenOwnerActions).to.exist;
    expect(wrapper.props().payingAccountActions).to.exist;
    expect(wrapper.props().payingAccountFundsActions).to.exist;
    expect(wrapper.find("FormControl").length).to.eq(1);
    expect(wrapper.find("FormControl").props().variant).to.eq("outlined");
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Paying Account");
    expect(wrapper.find("Select").length).to.eq(1);
    expect(wrapper.find("Select").props().error).to.be.false;
    expect(wrapper.find("Select").props().value).to.be.empty;
    expect(wrapper.find("OutlinedInput").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(1);
    expect(wrapper.find("Typography").props().align).to.eq("left");
    expect(wrapper.find("Typography").props().variant).to.eq("body1");
    expect(wrapper.find("Typography").props().className).to.eq("typography_payment");
    expect(wrapper.find("Typography").props().children).to.eq("This account pays for token creation service.");
  });

  it("renders PayingAccount - while checking paying account funds", () => {
    const wrapper = setup(
      payingAccount,
      accounts,
      loadingAccounts,
      true,
      payingAccountHasInsufficientFunds,
      payingAccountBalance,
      serviceFee
    );
    expect(wrapper.props().payingAccount).to.eq(payingAccount);
    expect(wrapper.props().accounts).to.eq(accounts);
    expect(wrapper.props().loadingAccounts).to.be.false;
    expect(wrapper.props().checkingPayingAccountFunds).to.be.true;
    expect(wrapper.props().payingAccountHasInsufficientFunds).to.be.false;
    expect(wrapper.props().payingAccountBalance).to.eq(payingAccountBalance);
    expect(wrapper.props().serviceFee).to.eq(serviceFee);
    expect(wrapper.props().tokenOwnerActions).to.exist;
    expect(wrapper.props().payingAccountActions).to.exist;
    expect(wrapper.props().payingAccountFundsActions).to.exist;
    expect(wrapper.find("FormControl").length).to.eq(1);
    expect(wrapper.find("FormControl").props().variant).to.eq("outlined");
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Paying Account");
    expect(wrapper.find("Select").length).to.eq(1);
    expect(wrapper.find("Select").props().error).to.be.false;
    expect(wrapper.find("Select").props().value).to.eq(payingAccount);
    expect(wrapper.find("OutlinedInput").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(1);
    expect(wrapper.find("Typography").props().align).to.eq("left");
    expect(wrapper.find("Typography").props().variant).to.eq("body1");
    expect(wrapper.find("Typography").props().className).to.eq("typography_payment");
    expect(wrapper.find("Typography").props().children).to.eq("This account pays for token creation service.");
  });

    it("renders PayingAccount - while checking paying account funds", () => {
    const wrapper = setup(
      payingAccount,
      accounts,
      loadingAccounts,
      checkingPayingAccountFunds,
      true,
      0.25,
      0.5
    );
    expect(wrapper.props().payingAccount).to.eq(payingAccount);
    expect(wrapper.props().accounts).to.eq(accounts);
    expect(wrapper.props().loadingAccounts).to.be.false;
    expect(wrapper.props().checkingPayingAccountFunds).to.be.false;
    expect(wrapper.props().payingAccountHasInsufficientFunds).to.be.true;
    expect(wrapper.props().payingAccountBalance).to.eq(0.25);
    expect(wrapper.props().serviceFee).to.eq(0.5);
    expect(wrapper.props().tokenOwnerActions).to.exist;
    expect(wrapper.props().payingAccountActions).to.exist;
    expect(wrapper.props().payingAccountFundsActions).to.exist;
    expect(wrapper.find("FormControl").length).to.eq(1);
    expect(wrapper.find("FormControl").props().variant).to.eq("outlined");
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Paying Account");
    expect(wrapper.find("Select").length).to.eq(1);
    expect(wrapper.find("Select").props().error).to.be.true;
    expect(wrapper.find("Select").props().value).to.eq(payingAccount);
    expect(wrapper.find("OutlinedInput").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(2);
    expect(wrapper.find("Typography").at(0).props().align).to.eq("left");
    expect(wrapper.find("Typography").at(0).props().variant).to.eq("body1");
    expect(wrapper.find("Typography").at(0).props().className).to.eq("typography_payment_error");
    expect(wrapper.find("Typography").at(0).props().children).to.eq("This account has insufficient funds.");
    expect(wrapper.find("Typography").at(1).props().align).to.eq("left");
    expect(wrapper.find("Typography").at(1).props().variant).to.eq("body1");
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography_error_secondary");
    expect(wrapper.find("Typography").at(1).props().children[0]).to.eq("Please top your account up with at least ");
    expect(wrapper.find("Typography").at(1).props().children[2]).to.eq(" ETH, and refresh the page!");
  });
});

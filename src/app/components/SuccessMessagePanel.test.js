import { expect } from 'chai';
import React from 'react';
import { SuccessMessagePanel } from './SuccessMessagePanel';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

const infoMessage = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";
const tokenOwner = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fe1";

describe("<SuccessMessagePanel /> tests", () => {
  let mount;

  function setup(
    infoMessage,
    tokenOwner,
    setDecimals = () => { },
    setTokenName = () => { },
    setTokenSymbol = () => { },
    setTotalSupply = () => { },
    setTokenType = () => { },
    setTokenOwner = () => { },
    setAppState = () => { },
    setCheckingTokenOwnerFunds = () => { },
    setTokenOwnerHasEnoughFunds = () => { },
    setInfoMessage = () => { },
    loadAllAccounts = () => { },
    setServiceFee = () => { }
  ) {
    const props = {
      infoMessage: infoMessage,
      tokenOwner: tokenOwner,
      decimalsActions: { setDecimals: setDecimals },
      tokenNameActions: { setTokenName: setTokenName },
      tokenSymbolActions: { setTokenSymbol: setTokenSymbol },
      totalSupplyActions: { setTotalSupply: setTotalSupply },
      tokenTypeActions: { setTokenType: setTokenType },
      tokenOwnerActions: { setTokenOwner: setTokenOwner },
      appStateActions: { setAppState: setAppState },
      tokenOwnerFundsActions: {
        setCheckingTokenOwnerFunds: setCheckingTokenOwnerFunds,
        setTokenOwnerHasEnoughFunds: setTokenOwnerHasEnoughFunds
      },
      infoMessageActions: { setInfoMessage: setInfoMessage },
      accountsActions: { loadAllAccounts: loadAllAccounts },
      serviceFeeActions: { setServiceFee: setServiceFee }
    };
    return mount(<SuccessMessagePanel {...props} />);
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

  it("renders SuccessMessagePanel", () => {
    const wrapper = setup(infoMessage, tokenOwner);
    expect(wrapper.props().infoMessage).to.eq(infoMessage);
    expect(wrapper.props().decimalsActions).to.exist;
    expect(wrapper.props().tokenNameActions).to.exist;
    expect(wrapper.props().tokenSymbolActions).to.exist;
    expect(wrapper.props().totalSupplyActions).to.exist;
    expect(wrapper.props().tokenTypeActions).to.exist;
    expect(wrapper.props().tokenOwnerActions).to.exist;
    expect(wrapper.props().appStateActions).to.exist;
    expect(wrapper.props().tokenOwnerFundsActions).to.exist;
    expect(wrapper.props().infoMessageActions).to.exist;
    expect(wrapper.props().accountsActions).to.exist;
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Your Tokens Have Been Successfully Created!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(4);
    expect(wrapper.find("Typography").at(1).props().variant).to.eq("subtitle1");
    expect(wrapper.find("Typography").at(2).props().variant).to.eq("subtitle1");
    expect(wrapper.find("Typography").at(3).props().variant).to.eq("h6");
    expect(wrapper.find("Typography").at(3).props().children).to.eq("Thank You for using TokenMint!");
    expect(wrapper.find("a").length).to.eq(2);
    expect(wrapper.find("a").at(0).props().href).to.eq("https://etherscan.io/tx/" + infoMessage);
    expect(wrapper.find("a").at(1).props().href).to.eq("https://etherscan.io/address/" + tokenOwner);
    expect(wrapper.find("span").length).to.eq(2);
  });

  it("simulates click on create more tokens button", () => {
    const setDecimals = sinon.spy();
    const setTokenName = sinon.spy();
    const setTokenSymbol = sinon.spy();
    const setTotalSupply = sinon.spy();
    const setTokenType = sinon.spy();
    const setTokenOwner = sinon.spy();
    const setAppState = sinon.spy();
    const setCheckingTokenOwnerFunds = sinon.spy();
    const setTokenOwnerHasEnoughFunds = sinon.spy();
    const setInfoMessage = sinon.spy();
    const loadAllAccounts = sinon.spy();
    const setServiceFee = sinon.spy();
    const wrapper = setup(
      infoMessage,
      tokenOwner,
      setDecimals,
      setTokenName,
      setTokenSymbol,
      setTotalSupply,
      setTokenType,
      setTokenOwner,
      setAppState,
      setCheckingTokenOwnerFunds,
      setTokenOwnerHasEnoughFunds,
      setInfoMessage,
      loadAllAccounts,
      setServiceFee
    );
    wrapper.find("span").at(1).simulate("click");
    expect(setDecimals.calledOnce).to.be.true;
    expect(setTokenName.calledOnce).to.be.true;
    expect(setTokenSymbol.calledOnce).to.be.true;
    expect(setTotalSupply.calledOnce).to.be.true;
    expect(setTokenType.calledOnce).to.be.true;
    expect(setTokenOwner.calledOnce).to.be.true;
    expect(setAppState.calledOnce).to.be.true;
    expect(setCheckingTokenOwnerFunds.calledOnce).to.be.true;
    expect(setTokenOwnerHasEnoughFunds.calledOnce).to.be.true;
    expect(setInfoMessage.calledOnce).to.be.true;
    expect(loadAllAccounts.calledOnce).to.be.true;
    expect(setServiceFee.calledOnce).to.be.true;
  });
});

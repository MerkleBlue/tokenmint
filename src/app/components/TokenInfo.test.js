import { expect } from 'chai';
import React from 'react';
import { TokenInfo } from './TokenInfo';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

const tokenName = "The First Amendment";
const tokenSymbol = "TFA";
const decimals = "18";
const totalSupply = "1000";

Enzyme.configure({ adapter: new Adapter() });

describe("<TokenInfo /> tests", () => {
  let mount;

  function setup(
    tokenName,
    tokenSymbol,
    decimals,
    totalSupply,
    setTokenName = () => { },
    setTokenSymbol = () => { },
    setDecimals = () => { },
    setTotalSupply = () => { }
  ) {
    const props = {
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      decimals: decimals,
      totalSupply: totalSupply,
      decimalsActions: { setDecimals: setDecimals },
      tokenNameActions: { setTokenName: setTokenName },
      tokenSymbolActions: { setTokenSymbol: setTokenSymbol },
      totalSupplyActions: { setTotalSupply: setTotalSupply }
    };
    return mount(<TokenInfo {...props} />);
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

  it("renders TokenInfo invalid token name", () => {
    const wrapper = setup("A", tokenSymbol, decimals, totalSupply);
    expect(wrapper.props().tokenName).to.eq("A");
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenNameActions).to.not.be.empty;
    expect(wrapper.props().tokenSymbolActions).to.not.be.empty;
    expect(wrapper.props().decimalsActions).to.not.be.empty;
    expect(wrapper.props().totalSupplyActions).to.not.be.empty;
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Token Attributes");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("TextField").length).to.eq(4);
    expect(wrapper.find("TextField").at(0).props().error).to.be.true;
    expect(wrapper.find("TextField").at(1).props().error).to.be.false;
    expect(wrapper.find("TextField").at(2).props().error).to.be.false;
    expect(wrapper.find("TextField").at(3).props().error).to.be.false;
    expect(wrapper.find("TextField").at(0).props().value).to.eq("A");
    expect(wrapper.find("TextField").at(1).props().value).to.eq(tokenSymbol);
    expect(wrapper.find("TextField").at(2).props().value).to.eq(decimals);
    expect(wrapper.find("TextField").at(3).props().value).to.eq(totalSupply);
    expect(wrapper.find("Typography").length).to.eq(5);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography_error");
    expect(wrapper.find("Typography").at(2).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(3).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(4).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(1).props().children).to.eq("The name of the token. 3-25 symbols. " +
      "Alphanumerical characters, space, and hyphen are accepted.");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("3-4 characters (example ETH, BTC, BAT, etc.). No spaces. Only alphanumerical characters.");
    expect(wrapper.find("Typography").at(3).props().children).to.eq("Defines the number of decimals for the token. " +
      "0-50 numerals are accepted. 18 is common practice.");
    expect(wrapper.find("Typography").at(4).props().children).to.eq("Total amount of tokens to be generated. " +
      "Minimum value is 1, and maximum 1000000000000000.");
  });

  it("renders TokenInfo invalid token symbol", () => {
    const wrapper = setup(tokenName, "A", decimals, totalSupply);
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq("A");
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenNameActions).to.not.be.empty;
    expect(wrapper.props().tokenSymbolActions).to.not.be.empty;
    expect(wrapper.props().decimalsActions).to.not.be.empty;
    expect(wrapper.props().totalSupplyActions).to.not.be.empty;
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Token Attributes");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("TextField").length).to.eq(4);
    expect(wrapper.find("TextField").at(0).props().error).to.be.false;
    expect(wrapper.find("TextField").at(1).props().error).to.be.true;
    expect(wrapper.find("TextField").at(2).props().error).to.be.false;
    expect(wrapper.find("TextField").at(3).props().error).to.be.false;
    expect(wrapper.find("TextField").at(0).props().value).to.eq(tokenName);
    expect(wrapper.find("TextField").at(1).props().value).to.eq("A");
    expect(wrapper.find("TextField").at(2).props().value).to.eq(decimals);
    expect(wrapper.find("TextField").at(3).props().value).to.eq(totalSupply);
    expect(wrapper.find("Typography").length).to.eq(5);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(2).props().className).to.eq("typography_error");
    expect(wrapper.find("Typography").at(3).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(4).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(1).props().children).to.eq("The name of the token. 3-25 symbols. " +
      "Alphanumerical characters, space, and hyphen are accepted.");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("3-4 characters (example ETH, BTC, BAT, etc.). No spaces. Only alphanumerical characters.");
    expect(wrapper.find("Typography").at(3).props().children).to.eq("Defines the number of decimals for the token. " +
      "0-50 numerals are accepted. 18 is common practice.");
    expect(wrapper.find("Typography").at(4).props().children).to.eq("Total amount of tokens to be generated. " +
      "Minimum value is 1, and maximum 1000000000000000.");
  });

  it("renders TokenInfo token symbol not unique", () => {
    const wrapper = setup(tokenName, "ETH", decimals, totalSupply);
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq("ETH");
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenNameActions).to.not.be.empty;
    expect(wrapper.props().tokenSymbolActions).to.not.be.empty;
    expect(wrapper.props().decimalsActions).to.not.be.empty;
    expect(wrapper.props().totalSupplyActions).to.not.be.empty;
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Token Attributes");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("TextField").length).to.eq(4);
    expect(wrapper.find("TextField").at(0).props().error).to.be.false;
    expect(wrapper.find("TextField").at(1).props().error).to.be.false;
    expect(wrapper.find("TextField").at(2).props().error).to.be.false;
    expect(wrapper.find("TextField").at(3).props().error).to.be.false;
    expect(wrapper.find("TextField").at(0).props().value).to.eq(tokenName);
    expect(wrapper.find("TextField").at(1).props().value).to.eq("ETH");
    expect(wrapper.find("TextField").at(2).props().value).to.eq(decimals);
    expect(wrapper.find("TextField").at(3).props().value).to.eq(totalSupply);
    expect(wrapper.find("Typography").length).to.eq(5);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(2).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(3).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(4).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(1).props().children).to.eq("The name of the token. 3-25 symbols. " +
      "Alphanumerical characters, space, and hyphen are accepted.");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("This token symbol is already in use. We advise using another symbol.");
    expect(wrapper.find("Typography").at(3).props().children).to.eq("Defines the number of decimals for the token. " +
      "0-50 numerals are accepted. 18 is common practice.");
    expect(wrapper.find("Typography").at(4).props().children).to.eq("Total amount of tokens to be generated. " +
      "Minimum value is 1, and maximum 1000000000000000.");
  });

  it("renders TokenInfo invalid decimals", () => {
    const wrapper = setup(tokenName, tokenSymbol, "51", totalSupply);
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq("51");
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenNameActions).to.not.be.empty;
    expect(wrapper.props().tokenSymbolActions).to.not.be.empty;
    expect(wrapper.props().decimalsActions).to.not.be.empty;
    expect(wrapper.props().totalSupplyActions).to.not.be.empty;
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Token Attributes");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("TextField").length).to.eq(4);
    expect(wrapper.find("TextField").at(0).props().error).to.be.false;
    expect(wrapper.find("TextField").at(1).props().error).to.be.false;
    expect(wrapper.find("TextField").at(2).props().error).to.be.true;
    expect(wrapper.find("TextField").at(3).props().error).to.be.false;
    expect(wrapper.find("TextField").at(0).props().value).to.eq(tokenName);
    expect(wrapper.find("TextField").at(1).props().value).to.eq(tokenSymbol);
    expect(wrapper.find("TextField").at(2).props().value).to.eq("51");
    expect(wrapper.find("TextField").at(3).props().value).to.eq(totalSupply);
    expect(wrapper.find("Typography").length).to.eq(5);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(2).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(3).props().className).to.eq("typography_error");
    expect(wrapper.find("Typography").at(4).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(1).props().children).to.eq("The name of the token. 3-25 symbols. " +
      "Alphanumerical characters, space, and hyphen are accepted.");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("3-4 characters (example ETH, BTC, BAT, etc.). No spaces. Only alphanumerical characters.");
    expect(wrapper.find("Typography").at(3).props().children).to.eq("Defines the number of decimals for the token. " +
      "0-50 numerals are accepted. 18 is common practice.");
    expect(wrapper.find("Typography").at(4).props().children).to.eq("Total amount of tokens to be generated. " +
      "Minimum value is 1, and maximum 1000000000000000.");
  });

  it("renders TokenInfo invalid totalSupply", () => {
    const wrapper = setup(tokenName, tokenSymbol, decimals, "0");
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq("0");
    expect(wrapper.props().tokenNameActions).to.not.be.empty;
    expect(wrapper.props().tokenSymbolActions).to.not.be.empty;
    expect(wrapper.props().decimalsActions).to.not.be.empty;
    expect(wrapper.props().totalSupplyActions).to.not.be.empty;
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Token Attributes");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("TextField").length).to.eq(4);
    expect(wrapper.find("TextField").at(0).props().error).to.be.false;
    expect(wrapper.find("TextField").at(1).props().error).to.be.false;
    expect(wrapper.find("TextField").at(2).props().error).to.be.false;
    expect(wrapper.find("TextField").at(3).props().error).to.be.true;
    expect(wrapper.find("TextField").at(0).props().value).to.eq(tokenName);
    expect(wrapper.find("TextField").at(1).props().value).to.eq(tokenSymbol);
    expect(wrapper.find("TextField").at(2).props().value).to.eq(decimals);
    expect(wrapper.find("TextField").at(3).props().value).to.eq("0");
    expect(wrapper.find("Typography").length).to.eq(5);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(2).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(3).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(4).props().className).to.eq("typography_error");
    expect(wrapper.find("Typography").at(1).props().children).to.eq("The name of the token. 3-25 symbols. " +
      "Alphanumerical characters, space, and hyphen are accepted.");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("3-4 characters (example ETH, BTC, BAT, etc.). No spaces. Only alphanumerical characters.");
    expect(wrapper.find("Typography").at(3).props().children).to.eq("Defines the number of decimals for the token. " +
      "0-50 numerals are accepted. 18 is common practice.");
    expect(wrapper.find("Typography").at(4).props().children).to.eq("Total amount of tokens to be generated. " +
      "Minimum value is 1, and maximum 1000000000000000.");
  });

  it("renders TokenInfo valid props", () => {
    const wrapper = setup(tokenName, tokenSymbol, decimals, totalSupply);
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenNameActions).to.not.be.empty;
    expect(wrapper.props().tokenSymbolActions).to.not.be.empty;
    expect(wrapper.props().decimalsActions).to.not.be.empty;
    expect(wrapper.props().totalSupplyActions).to.not.be.empty;
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Token Attributes");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("TextField").length).to.eq(4);
    expect(wrapper.find("TextField").at(0).props().error).to.be.false;
    expect(wrapper.find("TextField").at(1).props().error).to.be.false;
    expect(wrapper.find("TextField").at(2).props().error).to.be.false;
    expect(wrapper.find("TextField").at(3).props().error).to.be.false;
    expect(wrapper.find("TextField").at(0).props().value).to.eq(tokenName);
    expect(wrapper.find("TextField").at(1).props().value).to.eq(tokenSymbol);
    expect(wrapper.find("TextField").at(2).props().value).to.eq(decimals);
    expect(wrapper.find("TextField").at(3).props().value).to.eq(totalSupply);
    expect(wrapper.find("Typography").length).to.eq(5);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(2).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(3).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(4).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(1).props().children).to.eq("The name of the token. 3-25 symbols. " +
      "Alphanumerical characters, space, and hyphen are accepted.");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("3-4 characters (example ETH, BTC, BAT, etc.). No spaces. Only alphanumerical characters.");
    expect(wrapper.find("Typography").at(3).props().children).to.eq("Defines the number of decimals for the token. " +
      "0-50 numerals are accepted. 18 is common practice.");
    expect(wrapper.find("Typography").at(4).props().children).to.eq("Total amount of tokens to be generated. " +
      "Minimum value is 1, and maximum 1000000000000000.");
  });

  it("simulates value changes", () => {
    const setTokenName = sinon.spy();
    const setTokenSymbol = sinon.spy();
    const setDecimals = sinon.spy();
    const setTotalSupply = sinon.spy();
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      setTokenName,
      setTokenSymbol,
      setDecimals,
      setTotalSupply
    );
    wrapper.find("TextField").at(0).simulate("change", {
      target: { value: "Token Name" }
    });
    expect(setTokenName.calledWith("Token Name"));
    wrapper.find("TextField").at(1).simulate("change", {
      target: { value: "TNN" }
    });
    expect(setTokenSymbol.calledWith("TNN"));
    wrapper.find("TextField").at(2).simulate("change", {
      target: { value: "50" }
    });
    expect(setDecimals.calledWith("50"));
    wrapper.find("TextField").at(3).simulate("change", {
      target: { value: "10000000000" }
    });
    expect(setTotalSupply.calledWith("10000000000"));
  });
});

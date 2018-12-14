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

describe("<Footer /> tests", () => {
  let mount;

  function setup(
    tokenName,
    tokenSymbol,
    decimals,
    totalSupply,
    tokenType,
    setAppState = () => { }
  ) {
    const props = {
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      decimals: decimals,
      totalSupply: totalSupply,
      tokenType: tokenType,
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
      tokenType
    );
    expect(wrapper.props().tokenName).to.be.empty;
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled-mint wow fadeInUp");
  });

  it("renders Footer non existing token symbol", () => {
    const wrapper = setup(
      tokenName,
      initialState.tokenSymbol,
      decimals,
      totalSupply,
      tokenType
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.be.empty;
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled-mint wow fadeInUp");
  });

  it("renders Footer invalid decimals", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      "-1",
      totalSupply,
      tokenType
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq("-1");
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled-mint wow fadeInUp");
  });

  it("renders Footer invalid decimals", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      "0",
      tokenType
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq("0");
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-disabled-mint wow fadeInUp");
  });


  it("renders Footer with valid props", () => {
    const wrapper = setup(
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType
    );
    expect(wrapper.props().tokenName).to.eq(tokenName);
    expect(wrapper.props().tokenSymbol).to.eq(tokenSymbol);
    expect(wrapper.props().decimals).to.eq(decimals);
    expect(wrapper.props().totalSupply).to.eq(totalSupply);
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().appStateActions).to.not.be.empty;
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().className).to.eq("btn btn-common-mint wow fadeInUp");
  });

  it("simulates click on disabled button", () => {
    const setAppState = sinon.spy();
    const wrapper = setup(
      initialState.tokenName,
      tokenSymbol,
      decimals,
      totalSupply,
      tokenType,
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
      setAppState
    );
    wrapper.find("span").simulate("click");
    expect(setAppState.calledOnce).to.be.true;
  });
});

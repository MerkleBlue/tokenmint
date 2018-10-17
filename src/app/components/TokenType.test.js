import { expect } from 'chai';
import React from 'react';
import { TokenType } from './TokenType';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe("<TokenType /> tests", () => {
  let mount;

  function setup(tokenType, tokenActions) {
    const props = {
      tokenType: tokenType,
      tokenActions: tokenActions
    };
    return mount(<TokenType {...props} />);
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

  it("renders TokenType with erc20 option", () => {
    const wrapper = setup("erc20", {});
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenActions).to.be.empty;
    expect(wrapper.find("Grid").length).to.eq(3);
    expect(wrapper.find("RadioGroup").length).to.eq(1);
    expect(wrapper.find("RadioGroup").props().name).to.eq("tokenType");
    expect(wrapper.find("RadioGroup").props().value).to.eq("erc20");
    expect(wrapper.find("FormControlLabel").length).to.eq(2);
    expect(wrapper.find("FormControlLabel").at(0).props().value).to.eq("erc20");
    expect(wrapper.find("FormControlLabel").at(0).props().label).to.eq("ERC20");
    expect(wrapper.find("FormControlLabel").at(0).props().labelPlacement).to.eq("start");
    expect(wrapper.find("FormControlLabel").at(1).props().value).to.eq("erc223");
    expect(wrapper.find("FormControlLabel").at(1).props().label).to.eq("ERC223");
    expect(wrapper.find("FormControlLabel").at(1).props().labelPlacement).to.eq("start");
    expect(wrapper.find("Radio").length).to.eq(2);
    expect(wrapper.find("Radio").at(0).props().color).to.eq("default");
    expect(wrapper.find("Radio").at(1).props().color).to.eq("default");
  });

  it("renders TokenType with erc223 option", () => {
    const wrapper = setup("erc223", {});
    expect(wrapper.props().tokenType).to.eq("erc223");
    expect(wrapper.props().tokenActions).to.be.empty;
    expect(wrapper.find("Grid").length).to.eq(3);
    expect(wrapper.find("RadioGroup").length).to.eq(1);
    expect(wrapper.find("RadioGroup").props().name).to.eq("tokenType");
    expect(wrapper.find("RadioGroup").props().value).to.eq("erc223");
    expect(wrapper.find("FormControlLabel").length).to.eq(2);
    expect(wrapper.find("FormControlLabel").at(0).props().value).to.eq("erc20");
    expect(wrapper.find("FormControlLabel").at(0).props().label).to.eq("ERC20");
    expect(wrapper.find("FormControlLabel").at(0).props().labelPlacement).to.eq("start");
    expect(wrapper.find("FormControlLabel").at(1).props().value).to.eq("erc223");
    expect(wrapper.find("FormControlLabel").at(1).props().label).to.eq("ERC223");
    expect(wrapper.find("FormControlLabel").at(1).props().labelPlacement).to.eq("start");
    expect(wrapper.find("Radio").length).to.eq(2);
    expect(wrapper.find("Radio").at(0).props().color).to.eq("default");
    expect(wrapper.find("Radio").at(1).props().color).to.eq("default");
  });

  // it("simulates erc220 option click", () => {
  //   const setTokenType = sinon.spy();
  //   const wrapper = setup("erc20", { setTokenType: setTokenType });
  //   wrapper.find("FormControlLabel").at(1).simulate("click");
  //   expect(setTokenType.calledOnce).to.be.true;
  // });
});

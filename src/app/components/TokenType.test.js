import { expect } from 'chai';
import React from 'react';
import { TokenType } from './TokenType';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe("<TokenType /> tests", () => {
  let mount;

  function setup(tokenType) {
    const props = {
      tokenType: tokenType,
      tokenTypeActions: { setTokenType: () => { } }
    };
    return mount(<TokenType {...props} />);
  }

  function setupShallow(tokenType, setTokenType) {
    const props = {
      tokenType: tokenType,
      tokenTypeActions: { setTokenType: setTokenType }
    };
    return createShallow()(<TokenType {...props} />);
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
    const wrapper = setup("erc20");
    expect(wrapper.props().tokenType).to.eq("erc20");
    expect(wrapper.props().tokenTypeActions).to.not.be.empty;
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
    expect(wrapper.find("Radio").at(0).props().checked).to.be.true;
    expect(wrapper.find("Radio").at(1).props().color).to.eq("default");
    expect(wrapper.find("Radio").at(1).props().checked).to.be.false;
  });

  it("renders TokenType with erc223 option", () => {
    const wrapper = setup("erc223");
    expect(wrapper.props().tokenType).to.eq("erc223");
    expect(wrapper.props().tokenTypeActions).to.not.be.empty;
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
    expect(wrapper.find("Radio").at(0).props().checked).to.be.false;
    expect(wrapper.find("Radio").at(1).props().color).to.eq("default");
    expect(wrapper.find("Radio").at(1).props().checked).to.be.true;
  });

  // for change event simulation we use shallow rendering because it doesn't work with createMount
  it("simulates erc223 option click", () => {
    const setTokenType = sinon.spy();
    const wrapper = setupShallow("erc20", setTokenType);
    wrapper.find("RadioGroup").simulate("change", {
      target: { value: "erc223" }
    });
    expect(setTokenType.calledWith("erc223")).to.be.true;
  });
});

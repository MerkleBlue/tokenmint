import { expect } from 'chai';
import React from 'react';
import { TokenType } from './TokenType';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

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
  });
});

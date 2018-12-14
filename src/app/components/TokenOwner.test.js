import { expect } from 'chai';
import React from 'react';
import { TokenOwner } from './TokenOwner';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import initialState from '../reducers/initialState';

const tokenOwner = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";

Enzyme.configure({ adapter: new Adapter() });

describe("<TokenOwner /> tests", () => {
  let mount;

  function setup(
    tokenOwner,
    setTokenOwner = () => { }
  ) {
    const props = {
      tokenOwner: tokenOwner,
      tokenOwnerActions: { setTokenOwner: setTokenOwner }
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

  it("renders TokenOwner without tokenOwner", () => {
    const wrapper = setup(
      initialState.tokenOwner
    );
    expect(wrapper.props().tokenOwner).to.be.empty;
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Account");
    expect(wrapper.find("Typography").length).to.eq(1);
    expect(wrapper.find("Typography").at(0).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(0).props().children).to.eq("This account will be owner of the created tokens!");
  });

  it("renders TokenOwner with invalid tokenOwner", () => {
    const wrapper = setup(
      "AAA"
    );
    expect(wrapper.props().tokenOwner).to.eq("AAA");
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Account");
    expect(wrapper.find("Typography").length).to.eq(1);
    expect(wrapper.find("Typography").at(0).props().className).to.eq("typography_error");
    expect(wrapper.find("Typography").at(0).props().children).to.eq("Not a valid ETH account");
  });

  it("renders TokenOwner with valid tokenOwner", () => {
    const wrapper = setup(
      tokenOwner
    );
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.find("InputLabel").length).to.eq(1);
    expect(wrapper.find("InputLabel").props().children).to.eq("Account");
    expect(wrapper.find("Typography").length).to.eq(1);
    expect(wrapper.find("Typography").at(0).props().className).to.eq("typography");
    expect(wrapper.find("Typography").at(0).props().children).to.eq("This account will be owner of the created tokens!");
  });
});

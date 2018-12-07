import { expect } from 'chai';
import React from 'react';
import { LoadingPanel } from './LoadingPanel';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

const tokenOwner = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";

Enzyme.configure({ adapter: new Adapter() });

describe("<LoadingPanel /> tests", () => {
  let mount;

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

  it("renders LoadingPanel", () => {
    const wrapper = mount(<LoadingPanel tokenOwner={tokenOwner}/>);
    expect(wrapper.props().tokenOwner).to.eq(tokenOwner);
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Approve");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(3);
    expect(wrapper.find("Typography").at(1).props().align).to.eq("center");
    expect(wrapper.find("Typography").at(1).props().variant).to.eq("subtitle1");
    expect(wrapper.find("Typography").at(1).props().children).to.eq("Your transaction is about to be sent.");
    expect(wrapper.find("Typography").at(2).props().align).to.eq("center");
    expect(wrapper.find("Typography").at(2).props().variant).to.eq("subtitle1");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("Please set the mining fee and confirm token creation in your wallet.");
    expect(wrapper.find("LinearProgress").length).to.eq(1);
    expect(wrapper.find("LinearProgress").props().variant).to.eq("indeterminate");
  });
});

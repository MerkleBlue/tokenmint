import { expect } from 'chai';
import React from 'react';
import { MiningInProgressPanel } from './MiningInProgressPanel';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

Enzyme.configure({ adapter: new Adapter() });

describe("<MiningInProgressPanel /> tests", () => {
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

  it("renders MiningInProgressPanel", () => {
    const wrapper = mount(<MiningInProgressPanel />);
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Mining In Progress...");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(3);
    expect(wrapper.find("Typography").at(1).props().align).to.eq("center");
    expect(wrapper.find("Typography").at(1).props().variant).to.eq("subtitle1");
    expect(wrapper.find("Typography").at(2).props().align).to.eq("center");
    expect(wrapper.find("Typography").at(2).props().variant).to.eq("h6");
    expect(wrapper.find("Typography").at(1).props().children).to.eq("Your tokens are being mined. This might take a few minutes.");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("Please do not leave this page!");
    expect(wrapper.find("LinearProgress").length).to.eq(1);
    expect(wrapper.find("LinearProgress").props().variant).to.eq("indeterminate");
  });
});

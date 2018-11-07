import { expect } from 'chai';
import React from 'react';
import { NetworkWarning } from './NetworkWarning';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import { NO_NETWORK } from '../../api/mintApi';

Enzyme.configure({ adapter: new Adapter() });

describe("<NetworkWarning /> tests", () => {
  let mount;

  function setup(network) {
    const props = {
      network: network,
    };
    return mount(<NetworkWarning {...props} />);
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

  it("renders NetworkWarning with main net", () => {
    const wrapper = setup("main");
    expect(wrapper.props().network).to.eq("main");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Network warning!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(3);
    expect(wrapper.find("Typography").at(1).props().children).to.eq("");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("");
    expect(wrapper.find("a").length).to.eq(0);
  });

  it("renders NetworkWarning with morden net", () => {
    const wrapper = setup("morden");
    expect(wrapper.props().network).to.eq("morden");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Network warning!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(3);
    expect(wrapper.find("Typography").at(1).props().children).to.eq("You are using Morden test network!");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("Your contract will be deployed to the Morden network. " +
      "If you wish to deploy on the Ethereum main network please switch to the main network and refresh the page.");
    expect(wrapper.find("a").length).to.eq(0);
  });

  it("renders NetworkWarning with ropsten net", () => {
    const wrapper = setup("ropsten");
    expect(wrapper.props().network).to.eq("ropsten");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Network warning!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(3);
    expect(wrapper.find("Typography").at(1).props().children).to.eq("You are using Ropsten test network!");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("Your contract will be deployed to the Ropsten network. " +
      "If you wish to deploy on the Ethereum main network please switch to the main network and refresh the page.");
    expect(wrapper.find("a").length).to.eq(0);
  });

  it("renders NetworkWarning with private net", () => {
    const wrapper = setup("private");
    expect(wrapper.props().network).to.eq("private");
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Network warning!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(3);
    expect(wrapper.find("Typography").at(1).props().children).to.eq("You are using Private test network!");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("Your contract will be deployed to the Private network. " +
      "If you wish to deploy on the Ethereum main network please switch to the main network and refresh the page.");
    expect(wrapper.find("a").length).to.eq(0);
  });

  it("renders NetworkWarning without net", () => {
    const wrapper = setup(NO_NETWORK);
    expect(wrapper.props().network).to.eq(NO_NETWORK);
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Network warning!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(4);
    expect(wrapper.find("Typography").at(1).props().children).to.eq("No network detected!");
    expect(wrapper.find("Typography").at(2).props().children).to.eq("Please activate MetaMask!");
    expect(wrapper.find("a").length).to.eq(1);
    expect(wrapper.find("a").at(0).props().href).to.eq("https://metamask.io/");
  });
});

import { expect } from 'chai';
import React from 'react';
import { ConnectToWallet } from './ConnectToWallet';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

const infoMessage = "Some error happened!";

describe("<ConnectToWallet /> tests", () => {
  let mount;

  function setup(unlockWallet = () => { }) {
    const props = {
      walletActions: { unlockWallet: unlockWallet }
    };
    return mount(<ConnectToWallet {...props} />);
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

  it("renders ConnectToWallet", () => {
    const wrapper = setup();
    expect(wrapper.props().walletActions).to.exist;
    expect(wrapper.find("span").length).to.eq(1);
    expect(wrapper.find("span").props().children.length).to.eq(2);
    expect(wrapper.find("span").props().children[1]).to.eq("Connect to Wallet");
    expect(wrapper.find("Typography").length).to.eq(1);
    expect(wrapper.find("Typography").props().children).to.eq("Please connect to Ethereum wallet.");
  });

  it("simulates click on connect to wallet button", () => {
    const unlockWallet = sinon.spy();
    const wrapper = setup(unlockWallet);
    wrapper.find("span").simulate("click");
    expect(unlockWallet.calledOnce).to.be.true;
  });
});

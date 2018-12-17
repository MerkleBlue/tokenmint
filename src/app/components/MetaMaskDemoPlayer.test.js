import { expect } from 'chai';
import React from 'react';
import MetaMaskDemoPlayer from './MetaMaskDemoPlayer';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe("<MetaMaskDemoPlayer /> tests", () => {
  let mount;

  function setup(
    isVideoOpen,
    handleVideoClose = () => { }
  ) {
    const props = {
      isVideoOpen: isVideoOpen,
      handleVideoClose: handleVideoClose
    };
    return mount(<MetaMaskDemoPlayer {...props} />);
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

  it("renders MetaMaskDemoPlayer", () => {
    const wrapper = setup(true);
    expect(wrapper.props().isVideoOpen).to.be.true;
    expect(wrapper.props().handleVideoClose).to.exist;
    expect(wrapper.find("Dialog").length).to.eq(1);
    expect(wrapper.find("Dialog").props().open).to.be.true;
    expect(wrapper.find("iframe").length).to.eq(1);
    expect(wrapper.find("iframe").props().title).to.eq("metamask-intro");
    expect(wrapper.find("iframe").props().width).to.eq("580");
    expect(wrapper.find("iframe").props().height).to.eq("360");
    expect(wrapper.find("iframe").props().src).to.eq("https://www.youtube.com/embed/6Gf_kRE4MJU");
  });
});

import { expect } from 'chai';
import React from 'react';
import { DetectingWalletDialog } from './DetectingWalletDialog';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe("<DetectingWalletDialog /> tests", () => {
  let mount;

  function setup(
    isModalOpen,
    checkingNetwork,
    isMobileDevice,
    handleModalClose = () => { }
  ) {
    const props = {
      isModalOpen: isModalOpen,
      checkingNetwork: checkingNetwork,
      handleModalClose: handleModalClose,
      isMobileDevice: isMobileDevice
    };
    return mount(<DetectingWalletDialog {...props} />);
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

  it("renders DetectingWalletDialog while checking network", () => {
    const wrapper = setup(true, true, false);
    expect(wrapper.props().isModalOpen).to.be.true;
    expect(wrapper.props().checkingNetwork).to.be.true;
    expect(wrapper.props().handleModalClose).to.exist;
    expect(wrapper.find("Dialog").length).to.eq(1);
    expect(wrapper.find("Dialog").props().open).to.be.true;
    expect(wrapper.find("Dialog").props().onClose).to.exist;
    expect(wrapper.find("Dialog").props().disableBackdropClick).to.be.true;
    expect(wrapper.find("Dialog").props().disableEscapeKeyDown).to.be.true;
    expect(wrapper.find("DialogTitle").length).to.eq(1);
    expect(wrapper.find("DialogContent").length).to.eq(1);
    expect(wrapper.find("DialogTitle").props().children).to.eq("Detecting wallet");
    expect(wrapper.find("CircularProgress").length).to.eq(1);
  });

  it("renders desktop DetectingWalletDialog while not checking network", () => {
    const wrapper = setup(true, false, false);
    expect(wrapper.props().isModalOpen).to.be.true;
    expect(wrapper.props().checkingNetwork).to.be.false;
    expect(wrapper.props().handleModalClose).to.exist;
    expect(wrapper.find("Dialog").length).to.eq(1);
    expect(wrapper.find("Dialog").props().open).to.be.true;
    expect(wrapper.find("Dialog").props().onClose).to.exist;
    expect(wrapper.find("Dialog").props().disableBackdropClick).to.be.true;
    expect(wrapper.find("Dialog").props().disableEscapeKeyDown).to.be.true;
    expect(wrapper.find("DialogTitle").length).to.eq(1);
    expect(wrapper.find("DialogContent").length).to.eq(1);
    expect(wrapper.find("DialogTitle").props().children).to.eq("No wallet detected");
    expect(wrapper.find("p").length).to.eq(1);
    expect(wrapper.find("p").props().children[1]).to.eq("MetaMask");
    expect(wrapper.find("Button").length).to.eq(1);
  });

  it("renders mobile DetectingWalletDialog while not checking network", () => {
    const wrapper = setup(true, false, true);
    expect(wrapper.props().isModalOpen).to.be.true;
    expect(wrapper.props().checkingNetwork).to.be.false;
    expect(wrapper.props().handleModalClose).to.exist;
    expect(wrapper.find("Dialog").length).to.eq(1);
    expect(wrapper.find("Dialog").props().open).to.be.true;
    expect(wrapper.find("Dialog").props().onClose).to.exist;
    expect(wrapper.find("Dialog").props().disableBackdropClick).to.be.true;
    expect(wrapper.find("Dialog").props().disableEscapeKeyDown).to.be.true;
    expect(wrapper.find("DialogTitle").length).to.eq(1);
    expect(wrapper.find("DialogContent").length).to.eq(1);
    expect(wrapper.find("DialogTitle").props().children).to.eq("No wallet detected");
    expect(wrapper.find("p").length).to.eq(1);
    expect(wrapper.find("p").props().children[1]).to.eq("Coinbase");
    expect(wrapper.find("Button").length).to.eq(1);
  });

  it("renders click on Close button", () => {
    const handleModalClose = sinon.spy();
    const wrapper = setup(true, false, false, handleModalClose);
    wrapper.find("Button").simulate("click");
    expect(handleModalClose.calledOnce).to.be.true;
  });
});

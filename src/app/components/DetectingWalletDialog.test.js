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
    handleModalClose = () => { }
  ) {
    const props = {
      isModalOpen: isModalOpen,
      checkingNetwork: checkingNetwork,
      handleModalClose: handleModalClose
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
    const wrapper = setup(true, true);
    expect(wrapper.props().isModalOpen).to.be.true;
    expect(wrapper.props().checkingNetwork).to.be.true;
    expect(wrapper.props().handleModalClose).to.exist;
  });
});

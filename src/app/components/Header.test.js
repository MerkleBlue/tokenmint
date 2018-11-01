import { expect } from 'chai';
import React from 'react';
import Header from './Header';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

Enzyme.configure({ adapter: new Adapter() });

describe("<Header /> tests", () => {
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

  it("renders Header", () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find("a").length).to.eq(1);
    expect(wrapper.find("a").props().href).to.eq("../");
    expect(wrapper.find("img").length).to.eq(2);
    expect(wrapper.find("img").at(0).props().src).to.exist;
    expect(wrapper.find("img").at(1).props().src).to.exist;
    expect(wrapper.find("Typography").length).to.eq(1);
    expect(wrapper.find("Typography").props().color).to.eq("textSecondary");
    expect(wrapper.find("Typography").props().variant).to.eq("h5");
    expect(wrapper.find("Typography").props().gutterBottom).to.be.true;
    expect(wrapper.find("Typography").props().children).to.eq("Your own Token powered by");
  });
});

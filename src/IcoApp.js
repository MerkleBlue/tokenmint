
import React from 'react';
import ICOAttributesPanel from './app/components/ICOAttributesPanel'; //eslint-disable-line import/no-named-as-default
import './App.css';
import FullStory from 'react-fullstory';
import Header from './app/components/Header'; //eslint-disable-line import/no-named-as-default

const IcoApp = () => (
  <div className="App">
    <FullStory org="G18A4" />
    <Header isIco />
    <ICOAttributesPanel />
  </div>
);

export default IcoApp;

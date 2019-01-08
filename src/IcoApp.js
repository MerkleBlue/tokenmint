
import React from 'react';
import ICOAttributesPanel from './app/components/ICOAttributesPanel'; //eslint-disable-line import/no-named-as-default
import ICOTokenAttributesPanel from './app/components/ICOTokenAttributesPanel'; //eslint-disable-line import/no-named-as-default
import Header from './app/components/Header'; //eslint-disable-line import/no-named-as-default
import ICOFooter from './app/components/ICOFooter'; //eslint-disable-line import/no-named-as-default
import './App.css';
import FullStory from 'react-fullstory';

const IcoApp = () => (
  <div className="App">
    <FullStory org="G18A4" />
    <Header isIco />
    <ICOTokenAttributesPanel />
    <ICOAttributesPanel />
    <ICOFooter />
  </div>
);

export default IcoApp;

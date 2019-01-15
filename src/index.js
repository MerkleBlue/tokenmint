import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import MintApp from './MintApp';
import IcoApp from './IcoApp';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './app/store/configureStore';
import ReactGA from 'react-ga';
import { getNetworkType } from './app/actions/networkActions';
import * as deviceDetector from './tools/deviceDetector';
import { setIsMobileDevice } from './app/actions/deviceActions';
import * as mintApi from './api/mintApi';
import { setWalletNeedsToBeUnlocked } from './app/actions/walletActions';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter as Router, Route } from "react-router-dom";

const { store, persistor } = configureStore();

window.addEventListener('load', function () {
  mintApi.initWeb3().then(walletNeedsToBeUnlocked => {
    store.dispatch(setWalletNeedsToBeUnlocked(walletNeedsToBeUnlocked));
    store.dispatch(getNetworkType());
    store.dispatch(setIsMobileDevice(deviceDetector.isMobileDevice()));
  });
});

ReactGA.initialize('UA-125703137-2');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div>
          <Route path="/token" component={MintApp} />
          <Route path="/ico" component={IcoApp} />
        </div>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

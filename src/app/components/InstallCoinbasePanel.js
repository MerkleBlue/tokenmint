import React from 'react';
import coinbase_logo from '../img/coinbase-logo.png';
import {
  Grid,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import './css/InstallCoinbasePanel.css';

export class InstallCoinbasePanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleGetGooglePlay = this.handleGetGooglePlay.bind(this);
    this.handleGetAppStore = this.handleGetAppStore.bind(this);
  }

  handleGetGooglePlay(e) {
    let win = window.open("https://play.google.com/store/apps/details?id=org.toshi", '_blank');
    win.focus();
  }

  handleGetAppStore(e) {
    let win = window.open("https://itunes.apple.com/app/coinbase-wallet/id1278383455?ls=1&mt=8", '_blank');
    win.focus();
  }

  render() {
    return (
      <Card
        className="card"
      >
        <CardHeader
          title="Install Coinbase Wallet"
          classes={{
            root: "card_header",
            title: "card_header_text"
          }}
        />
        <CardContent
          classes={{
            root: "card_content"
          }}
        >
          <img src={coinbase_logo} alt="" />
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <span
                className="btn btn-common-coinbase wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="400ms"
                onClick={this.handleGetGooglePlay}
              >
                Google Play
              </span>
            </Grid>
            <Grid item xs={12} md={6}>
              <span
                className="btn btn-common-coinbase wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="400ms"
                onClick={this.handleGetAppStore}
              >
                App Store
              </span>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default InstallCoinbasePanel;


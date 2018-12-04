import React from 'react';
import metamask_logo from '../img/metamask-logo.png';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Tooltip
} from '@material-ui/core';
import './css/InstallMetaMaskPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export class InstallMetamaskPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleGetChromeExtension = this.handleGetChromeExtension.bind(this);
    this.handleGetFirefoxExtension = this.handleGetFirefoxExtension.bind(this);
  }

  handleGetChromeExtension(e) {
    let win = window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn", '_blank');
    win.focus();
  }

  handleGetFirefoxExtension(e) {
    let win = window.open("https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/", '_blank');
    win.focus();
  }

  render() {
    return (
      <Card
        className="card"
      >
        <CardHeader
          title="Install MetaMask Wallet"
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
          <img src={metamask_logo} alt="" />
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <span
                className="btn btn-common-extension wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="400ms"
                onClick={this.handleGetChromeExtension}
              >
                Chrome extension
              </span>
            </Grid>
            <Grid item xs={12} md={6}>
              <span
                className="btn btn-common-extension wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="400ms"
                onClick={this.handleGetFirefoxExtension}
              >
                Firefox extension
              </span>
            </Grid>
          </Grid>
          <section>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <Tooltip
                    classes={{
                      tooltip: "tooltip_metamask"
                    }}
                    title="MetaMask demo video"
                  >
                    <a
                      href="https://www.youtube.com/watch?v=6Gf_kRE4MJU"
                      className="video-popup wow fadeInUp"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <FontAwesomeIcon className="play-icon" icon={faPlay} />
                    </a>
                  </Tooltip>
                </div>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    );
  }
}

export default InstallMetamaskPanel;


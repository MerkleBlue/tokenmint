import React from 'react';
import metamask_logo from '../img/metamask-logo.png';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Tooltip,
  Typography
} from '@material-ui/core';
import './css/InstallMetaMaskPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as appStateActions from '../actions/appStateActions';
import { bindActionCreators } from 'redux';
import appStates from '../reducers/appStates';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class InstallMetamaskPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleGetChromeExtension = this.handleGetChromeExtension.bind(this);
    this.handleGetFirefoxExtension = this.handleGetFirefoxExtension.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleGetChromeExtension(e) {
    let win = window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn", '_blank');
    win.focus();
  }

  handleGetFirefoxExtension(e) {
    let win = window.open("https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/", '_blank');
    win.focus();
  }

  handleBack(e) {
    this.props.appStateActions.setAppState(appStates.PENDING_CONFIRMATION);
  }

  handleNext(e) {

  }

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      }
    });

    return (
      <div>
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
            <MuiThemeProvider theme={theme}>
              <Typography
                align="center"
                variant="h6"
              >
                We detected no embedded Ethereum wallet!
              </Typography>
              <Typography
                align="center"
                variant="h6"
              >
                Please install MetaMask in order to be able to continue
              </Typography>
            </MuiThemeProvider>
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
        <form className="footer_main_form">
          <Grid container spacing={8}>
            <Grid item xs={6} md={6} className="grid_cell">
              <span
                className="btn btn-cancel wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="400ms"
                onClick={this.handleBack}
              >
                <FontAwesomeIcon className="fa_back_icon" icon={faChevronLeft} />
                {!this.props.isMobileDevice && " Back"}
              </span>
            </Grid>
            <Grid item xs={6} md={6} className="grid_cell">
              <span
                className="btn btn-confirm wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="400ms"
                onClick={this.handleNext}
              >
                {!this.props.isMobileDevice && "Next "}
                <FontAwesomeIcon className="fa_confirm_icon" icon={faChevronRight} />
              </span>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

InstallMetamaskPanel.propTypes = {
  isMobileDevice: PropTypes.bool.isRequired,
  appStateActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    isMobileDevice: state.isMobileDevice
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appStateActions: bindActionCreators(appStateActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstallMetamaskPanel);


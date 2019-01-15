import React from 'react';
import coinbase_logo from '../img/coinbase-logo.png';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core';
import './css/InstallCoinbasePanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as appStateActions from '../actions/appStateActions';
import * as accountsActions from '../actions/accountsActions';
import * as networkActions from '../actions/networkActions';
import * as walletActions from '../actions/walletActions';
import { bindActionCreators } from 'redux';
import * as mintApi from '../../api/mintApi';
import appStates from '../reducers/appStates';
import DetectingWalletDialog from './DetectingWalletDialog'; //eslint-disable-line import/no-named-as-default
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class InstallCoinbasePanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleGetGooglePlay = this.handleGetGooglePlay.bind(this);
    this.handleGetAppStore = this.handleGetAppStore.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.state = { isModalOpen: false };
  }

  handleModalClose() {
    this.setState({ isModalOpen: false });
  }

  handleGetGooglePlay(e) {
    let win = window.open("https://play.google.com/store/apps/details?id=org.toshi", '_blank');
    win.focus();
  }

  handleGetAppStore(e) {
    let win = window.open("https://itunes.apple.com/app/coinbase-wallet/id1278383455?ls=1&mt=8", '_blank');
    win.focus();
  }

  handleBack(e) {
    if (this.props.isIco) {
      this.props.appStateActions.setIcoAppState(appStates.INIT);
    } else {
      this.props.appStateActions.setAppState(appStates.INIT);
    }
  }

  handleNext(e) {
    mintApi.initWeb3().then(walletNeedsToBeUnlocked => {
      this.props.walletActions.setWalletNeedsToBeUnlocked(walletNeedsToBeUnlocked);
      this.props.networkActions.executeNetworkCheckWithStateTransition(this.props.isIco);
      this.props.accountsActions.loadAllAccounts();
    });
    this.setState({ isModalOpen: true });
  }

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      }
    });

    return (
      <div>
        <DetectingWalletDialog
          isModalOpen={this.state.isModalOpen}
          handleModalClose={this.handleModalClose}
        />
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
                Please install Coinbase and REFRESH THE PAGE in order to be able to continue
              </Typography>
            </MuiThemeProvider>
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
              </span>
            </Grid>
            <Grid item xs={6} md={6} className="grid_cell">
              <span
                className="btn btn-confirm wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="400ms"
                onClick={this.handleNext}
              >
                <FontAwesomeIcon className="fa_confirm_icon" icon={faChevronRight} />
              </span>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

InstallCoinbasePanel.propTypes = {
  isIco: PropTypes.bool.isRequired,
  appStateActions: PropTypes.object.isRequired,
  accountsActions: PropTypes.object.isRequired,
  networkActions: PropTypes.object.isRequired,
  walletActions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    accountsActions: bindActionCreators(accountsActions, dispatch),
    networkActions: bindActionCreators(networkActions, dispatch),
    walletActions: bindActionCreators(walletActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(InstallCoinbasePanel);


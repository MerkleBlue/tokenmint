import React from 'react';
import './css/NetworkWarning.css';
import { Typography, Card, CardHeader, CardContent } from '@material-ui/core';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { NO_NETWORK } from '../../api/mintApi';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class NetworkWarning extends React.Component {

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      }
    });

    let icon = "";
    let networkMessage = "";
    let descriptionMessage = "";
    let walletLink = "";

    if (this.props.network === "morden") {
      icon = <FontAwesomeIcon size="2x" className="fa_warning_icon" icon={faExclamationTriangle} />;
      networkMessage = "You are using Morden test network!";
      descriptionMessage = "Your contract will be deployed to the Morden network. " +
        "If you wish to deploy on the Ethereum main network please switch to the main network and refresh the page.";
    } else if (this.props.network === "ropsten") {
      icon = <FontAwesomeIcon size="2x" className="fa_warning_icon" icon={faExclamationTriangle} />;
      networkMessage = "You are using Ropsten test network!";
      descriptionMessage = "Your contract will be deployed to the Ropsten network. " +
        "If you wish to deploy on the Ethereum main network please switch to the main network and refresh the page.";
    } else if (this.props.network === "private") {
      icon = <FontAwesomeIcon size="2x" className="fa_warning_icon" icon={faExclamationTriangle} />;
      networkMessage = "You are using Private test network!";
      descriptionMessage = "Your contract will be deployed to the Private network. " +
        "If you wish to deploy on the Ethereum main network please switch to the main network and refresh the page.";
    } else if (this.props.network === NO_NETWORK) {
      icon = <FontAwesomeIcon size="2x" className="fa_error_icon" icon={faTimesCircle} />;
      networkMessage = "No Ethereum wallet detected!";
      descriptionMessage = "We recommend using ";
      walletLink = this.props.isMobileDevice ?
        <a href="https://wallet.coinbase.com/" rel="noopener noreferrer" target="_blank"> Coinbase for mobile!</a> :
        <a href="https://metamask.io/" rel="noopener noreferrer" target="_blank"> Metamask!</a>;
    } else {
      icon = <FontAwesomeIcon size="2x" className="fa_warning_icon" icon={faExclamationTriangle} />;
      networkMessage = "You are not using Ethereum main network!";
      descriptionMessage = "Your contract will not be deployed to the Ethereum main network. " +
        "If you wish to deploy on the Ethereum main network please switch to the main network and refresh the page.";
    }

    return (
      <Card className="card">
        <CardHeader
          title="Warning!"
          classes={{
            root: "card_header",
            title: "card_header_text"
          }}
          avatar={icon}
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
              {networkMessage}
            </Typography>
            <Typography
              align="left"
              variant="body1"
            >
              {descriptionMessage} {this.props.network === NO_NETWORK && walletLink}
            </Typography>
            {this.props.network === NO_NETWORK &&
              <Typography
                align="left"
                variant="body1"
              >
                Read about other wallet options at our <a
                  href="https://tokenmint.io/blog/web-3-enabled-ethereum-wallets-and-browsers.html"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Ethereum wallets
                </a> blog post.
              </Typography>
            }
          </MuiThemeProvider>
        </CardContent>
      </Card>
    );
  }
}

NetworkWarning.propTypes = {
  network: PropTypes.string.isRequired,
  isMobileDevice: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    network: state.network,
    isMobileDevice: state.isMobileDevice
  };
}

export default connect(mapStateToProps)(NetworkWarning);

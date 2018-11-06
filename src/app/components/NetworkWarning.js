import React from 'react';
import './css/NetworkWarning.css';
import { Typography, Card, CardHeader, CardContent } from '@material-ui/core';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { NO_NETWORK } from '../../api/mintApi';

class NetworkWarning extends React.Component {

  render() {

    let icon = "";
    let networkMessage = "";
    let descriptionMessage = "";

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
      networkMessage = "No network detected!";
      descriptionMessage = "Please activate MetaMask or any Ethereum wallet!";
    }

    return (
      <Card className="card">
        <CardHeader
          title="Network warning!"
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
          <Typography
            align="center"
            variant="h6"
          >
            {networkMessage}
          </Typography>
          <Typography
            align="left"
            variant="subtitle1"
          >
            {descriptionMessage}
          </Typography>
          {this.props.network === NO_NETWORK &&
            <div>
              <Typography
                align="left"
                variant="subtitle1"
              >
                You can download MetaMask at <a href="https://metamask.io/" rel="noopener noreferrer" target="_blank">metamask.io</a>
              </Typography>
              <Typography
                align="left"
                variant="subtitle1"
              >
                You can download Ethereum wallet at <a href="https://geth.ethereum.org/downloads/" rel="noopener noreferrer" target="_blank">geth.ethereum.org/downloads/</a>
                or at <a href="https://www.parity.io/ethereum/" rel="noopener noreferrer" target="_blank">www.parity.io/ethereum/</a>
              </Typography>
            </div>
          }
        </CardContent>
      </Card>
    );
  }
}

NetworkWarning.propTypes = {
  network: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    network: state.network
  };
}

export default connect(mapStateToProps)(NetworkWarning);

import React from 'react';
import './css/ConnectToWallet.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as walletActions from '../actions/walletActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@material-ui/core';

export class ConnectToWallet extends React.Component {

  constructor(props) {
    super(props);
    this.handleUnlockWallet = this.handleUnlockWallet.bind(this);
  }

  handleUnlockWallet(e) {
    this.props.walletActions.unlockWallet();
  }

  render() {
    return (
      <div>
        <span
          className="btn btn-unlock-wallet wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.handleUnlockWallet}
        >
          <FontAwesomeIcon className="fa_wallet_icon" icon={faWallet} />
          Connect to Wallet
        </span>
        <Typography
          align="left"
          variant="h6"
          className="typography_description"
        >
          Please connect to Ethereum wallet.
        </Typography>
      </div>
    );
  }
}

ConnectToWallet.propTypes = {
  walletActions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    walletActions: bindActionCreators(walletActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ConnectToWallet);


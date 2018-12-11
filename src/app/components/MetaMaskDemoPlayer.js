import React from 'react';
import { Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import './css/MetaMaskDemoPlayer.css';

export class MetaMaskDemoPlayer extends React.Component {

  render() {
    return (
      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={this.props.isVideoOpen}
        onClose={this.props.handleVideoClose}
        onEscapeKeyDown={this.props.handleVideoClose}
      >
        <iframe title="metamask-intro" width="580" height="360"
          src="https://www.youtube.com/embed/6Gf_kRE4MJU"
        />
      </Dialog>
    );
  }
}

MetaMaskDemoPlayer.propTypes = {
  isVideoOpen: PropTypes.bool.isRequired,
  handleVideoClose: PropTypes.func.isRequired
};

export default MetaMaskDemoPlayer;


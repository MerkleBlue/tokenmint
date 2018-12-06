import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress
 } from '@material-ui/core';
import PropTypes from 'prop-types';
import './css/DetectingWalletDialog.css';
import { connect } from 'react-redux';

export class DetectingWalletDialog extends React.Component {

  render() {
    let dialogTitle;
    let dialogContent;
    if (this.props.checkingNetwork) {
      dialogTitle = "Detecting wallet";
      dialogContent = <CircularProgress />;
    } else {
      dialogTitle = "No wallet detected";
      dialogContent = (
        <div>
          <p className="modal-text">If you already installed MetaMask, please REFRESH THE PAGE and resume to the next step</p>
          <Button className="close-modal-button" variant="contained" onClick={this.props.handleModalClose} >
            Close
          </Button>
        </div>
      );
    }

    return (
      <Dialog
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={this.props.isModalOpen}
          onClose={this.props.handleModalClose}
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle>
            {dialogTitle}
          </DialogTitle>
          <DialogContent className="dialog-content">
            {dialogContent}
          </DialogContent>
        </Dialog>
    );
  }
}

DetectingWalletDialog.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  checkingNetwork: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    checkingNetwork: state.checkingNetwork
  };
}

export default connect(mapStateToProps)(DetectingWalletDialog);

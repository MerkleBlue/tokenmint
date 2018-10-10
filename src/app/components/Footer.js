import React from 'react';
import './css/Footer.css';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputValidator from '../../tools/InputValidator';
import { bindActionCreators } from 'redux';
import * as decimalsActions from '../actions/decimalsActions';
import * as tokenNameActions from '../actions/tokenNameActions';
import * as tokenSymbolActions from '../actions/tokenSymbolActions';
import * as totalSupplyActions from '../actions/totalSupplyActions';
import * as tokenTypeActions from '../actions/tokenTypeActions';
import * as tokenOwnerActions from '../actions/tokenOwnerActions';
import initialState from '../reducers/initialState';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.handleTokenCreation = this.handleTokenCreation.bind(this);
    this.isCreationEnabled = this.isCreationEnabled.bind(this);
    this.handleClean = this.handleClean.bind(this);
  }

  isCreationEnabled() {
    return InputValidator.isInputValid(
      this.props.tokenName,
      this.props.tokenSymbol,
      this.props.decimals,
      this.props.totalSupply,
      this.props.tokenOwner
    );
  }

  handleTokenCreation(e) {
    alert(
      "tokenName: " + this.props.tokenName + " " +
      "tokenSymbol: " + this.props.tokenSymbol + " " +
      "decimals: " + this.props.decimals + " " +
      "totalSupply: " + this.props.totalSupply + " " +
      "tokenType: " + this.props.tokenType + " " +
      "tokenOwner: " + this.props.tokenOwner
    );
  }

  handleClean(e) {
    this.props.decimalsActions.setDecimals(initialState.decimals);
    this.props.tokenNameActions.setTokenName(initialState.tokenName);
    this.props.tokenSymbolActions.setTokenSymbol(initialState.tokenSymbol);
    this.props.totalSupplyActions.setTotalSupply(initialState.totalSupply);
    this.props.tokenTypeActions.setTokenType(initialState.tokenType);
    this.props.tokenOwnerActions.setTokenOwner(initialState.tokenOwner);
  }

  render() {
    let createBtn = this.isCreationEnabled() ?
      (
        <span
          className="btn btn-common wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
          onClick={this.handleTokenCreation}
        >
          Create
        </span>
      ) : (
        <span
          className="btn btn-disabled wow fadeInUp"
          data-wow-duration="1000ms"
          data-wow-delay="400ms"
        >
          Create
        </span>
      );

    return (
      <form className="footer_main_form">
        <Grid container wrap="nowrap" spacing={8}>
          <Grid item xs>
            {createBtn}
          </Grid>
          <Grid item xs>
            <span
              className="btn btn-clean wow fadeInUp"
              data-wow-duration="1000ms"
              data-wow-delay="400ms"
              onClick={this.handleClean}
            >
              Clean
            </span>
          </Grid>
        </Grid>
      </form>
    );
  }
}

Footer.propTypes = {
  decimalsActions: PropTypes.object.isRequired,
  tokenNameActions: PropTypes.object.isRequired,
  tokenSymbolActions: PropTypes.object.isRequired,
  totalSupplyActions: PropTypes.object.isRequired,
  tokenTypeActions: PropTypes.object.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired,
  tokenName: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  totalSupply: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  tokenOwner: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    tokenName: state.tokenName,
    tokenSymbol: state.tokenSymbol,
    decimals: state.decimals,
    totalSupply: state.totalSupply,
    tokenType: state.tokenType,
    tokenOwner: state.tokenOwner
  };
}

function mapDispatchToProps(dispatch) {
  return {
    decimalsActions: bindActionCreators(decimalsActions, dispatch),
    tokenNameActions: bindActionCreators(tokenNameActions, dispatch),
    tokenSymbolActions: bindActionCreators(tokenSymbolActions, dispatch),
    totalSupplyActions: bindActionCreators(totalSupplyActions, dispatch),
    tokenTypeActions: bindActionCreators(tokenTypeActions, dispatch),
    tokenOwnerActions: bindActionCreators(tokenOwnerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);


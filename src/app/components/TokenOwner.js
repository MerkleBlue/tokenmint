import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, Typography, OutlinedInput } from '@material-ui/core';
import './css/TokenOwner.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as tokenOwnerActions from '../actions/tokenOwnerActions';
import { bindActionCreators } from 'redux';

class TokenOwner extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.tokenOwnerActions.setTokenOwner(this.props.accounts[0]);
  }

  render() {
    let menuItems = this.props.accounts.map((account) => <MenuItem key={account} value={account}>{account}</MenuItem>);
    return (
      <form className="main_form">
        <Grid container wrap="nowrap" spacing={8}>
          <Grid item xs>
            <FormControl variant="outlined">
              <InputLabel>Accounts</InputLabel>
              <Select
                value={this.props.tokenOwner}
                onChange={this.handleChange}
                input={
                  <OutlinedInput className="select_field" />
                }
              >
                {menuItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <Typography
              align="left"
              color="textSecondary"
              variant="caption"
              className="typography"
            >
              ETH address (not exchange address). This address will be owner of the token (after sale end date).
            </Typography>
          </Grid>
        </Grid>
      </form>
    );
  }
}

TokenOwner.propTypes = {
  accounts: PropTypes.array.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    tokenOwner: state.tokenOwner
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenOwnerActions: bindActionCreators(tokenOwnerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenOwner);

import React from 'react';
import InputValidator from '../../tools/InputValidator';
import * as totalSupplyActions from '../actions/totalSupplyActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './css/TokenInfo.css';
import {
  TextField,
  Typography,
  Grid
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class TokenSupply extends React.Component {
  constructor(props) {
    super(props);
    this.handleTotalSupplyChange = this.handleTotalSupplyChange.bind(this);
    this.isTotalSupplyValid = this.isTotalSupplyValid.bind(this);
  }

  isTotalSupplyValid(totalSupply) {
    return InputValidator.isTotalSupplyValid(totalSupply);
  }

  handleTotalSupplyChange(e) {
    this.props.totalSupplyActions.setTotalSupply(e.target.value);
  }

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      palette: {
        primary: { 500: "#31bfdf" }
      }
    });

    return (
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <MuiThemeProvider theme={theme}>
            <TextField
              required
              id="outlined-required"
              label="Total supply"
              className="text_field"
              margin="normal"
              variant="outlined"
              inputProps={{ maxLength: 16, style: { textAlign: "center" } }}
              value={this.props.totalSupply}
              onChange={this.handleTotalSupplyChange}
              error={!InputValidator.isTotalSupplyValid(this.props.totalSupply)}
            />
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            align="left"
            variant="body1"
            className={InputValidator.isTotalSupplyValid(this.props.totalSupply) ? "typography_token_info" : "typography_token_info_error"}
          >
            Total amount of tokens to be generated. Minimum value is 1, and maximum 1000000000000000.
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

TokenSupply.propTypes = {
  totalSupplyActions: PropTypes.object.isRequired,
  totalSupply: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    totalSupply: state.totalSupply
  };
}

function mapDispatchToProps(dispatch) {
  return {
    totalSupplyActions: bindActionCreators(totalSupplyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenSupply);

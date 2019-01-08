import React from 'react';
import InputValidator from '../../tools/InputValidator';
import * as tokenNameActions from '../actions/tokenNameActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  TextField,
  Typography,
  Grid
} from '@material-ui/core';
import './css/TokenInfo.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class TokenName extends React.Component {

  constructor(props) {
    super(props);
    this.handleTokenNameChange = this.handleTokenNameChange.bind(this);
    this.isTokenNameValid = this.isTokenNameValid.bind(this);
  }

  isTokenNameValid(tokenName) {
    return InputValidator.isTokenNameValid(tokenName);
  }

  handleTokenNameChange(e) {
    this.props.tokenNameActions.setTokenName(e.target.value);
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
      <Grid container spacing={8} >
        <Grid item xs={12} md={6}>
          <MuiThemeProvider theme={theme}>
            <TextField
              required
              id="outlined-required"
              label="Token name"
              className="text_field"
              margin="normal"
              variant="outlined"
              inputProps={{ maxLength: 25 }}
              value={this.props.tokenName}
              error={!InputValidator.isTokenNameValid(this.props.tokenName)}
              onChange={this.handleTokenNameChange}
            />
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            align="left"
            variant="body1"
            className={InputValidator.isTokenNameValid(this.props.tokenName) ? "typography_token_info" : "typography_token_info_error"}
          >
            The name of the token. 3-25 symbols. Alphanumerical characters, space, and hyphen are accepted.
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

TokenName.propTypes = {
  tokenNameActions: PropTypes.object.isRequired,
  tokenName: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    tokenName: state.tokenName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenNameActions: bindActionCreators(tokenNameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenName);

import React from 'react';
import {
  Grid,
  Typography,
  TextField
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './css/TokenOwner.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as tokenOwnerActions from '../actions/tokenOwnerActions';
import { bindActionCreators } from 'redux';
import ReactGA from 'react-ga';
import InputValidator from '../../tools/InputValidator';

export class TokenOwner extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // TODO: remove logging when ga works properly
    console.log("Navigate to: /mint/"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/');
  }

  handleChange(e) {
    this.props.tokenOwnerActions.setTokenOwner(e.target.value);
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

    const description = InputValidator.isTokenOwnerValid(this.props.tokenOwner) ?
      "This account will be owner of the created tokens!" :
      "Not a valid ETH account";

    return (
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <MuiThemeProvider theme={theme}>
            <TextField
              required
              id="outlined-required"
              label="Token Owner"
              className="text_field"
              margin="normal"
              variant="outlined"
              inputProps={{ maxLength: 42 }}
              value={this.props.tokenOwner}
              error={!InputValidator.isTokenOwnerValid(this.props.tokenOwner)}
              onChange={this.handleChange}
            />
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            align="left"
            variant="body1"
            className={!InputValidator.isTokenOwnerValid(this.props.tokenOwner) ? "typography_error" : "typography"}
          >
            {description}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

TokenOwner.propTypes = {
  tokenOwner: PropTypes.string.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tokenOwner: state.tokenOwner,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenOwnerActions: bindActionCreators(tokenOwnerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenOwner);

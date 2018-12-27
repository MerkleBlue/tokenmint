import React from 'react';
import {
  TextField,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputValidator from '../../tools/InputValidator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as icoCapActions from '../actions/icoCapActions';
import * as icoRateActions from '../actions/icoRateActions';
import * as icoWalletActions from '../actions/icoWalletActions';
import './css/ICOAttributesPanel.css';

export class ICOAttributesPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleCapChange = this.handleCapChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleWalletChange = this.handleWalletChange.bind(this);
  }

  handleCapChange(e) {
    this.props.icoCapActions.setIcoCap(e.target.value);
  }

  handleRateChange(e) {
    this.props.icoRateActions.setIcoRate(e.target.value);
  }

  handleWalletChange(e) {
    this.props.icoWalletActions.setIcoWallet(e.target.value);
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
      <Card className="card">
        <CardHeader
          title="ICO Attributes"
          classes={{
            root: "card_header",
            title: "card_header_text"
          }}
        />
        <CardContent
          classes={{
            root: "card_content"
          }}
        >
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <MuiThemeProvider theme={theme}>
                <TextField
                  required
                  id="outlined-required"
                  label="Cap"
                  className="ico_text_field"
                  margin="normal"
                  variant="outlined"
                  inputProps={{ maxLength: 25 }}
                  value={this.props.icoCap}
                  error={!InputValidator.isIcoCapValid(this.props.icoCap)}
                  onChange={this.handleCapChange}
                />
              </MuiThemeProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiThemeProvider theme={theme}>
                <Typography
                  align="left"
                  variant="body1"
                  className={InputValidator.isIcoCapValid(this.props.icoCap) ? "typography_ico_info" : "typography_ico_info_error"}
                >
                  ICO cap in ETH.
                </Typography>
              </MuiThemeProvider>
            </Grid>
          </Grid>
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <MuiThemeProvider theme={theme}>
                <TextField
                  required
                  id="outlined-required"
                  label="Rate"
                  className="ico_text_field"
                  margin="normal"
                  variant="outlined"
                  inputProps={{ maxLength: 25 }}
                  value={this.props.icoRate}
                  error={!InputValidator.isIcoRateValid(this.props.icoRate)}
                  onChange={this.handleRateChange}
                />
              </MuiThemeProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiThemeProvider theme={theme}>
                <Typography
                  align="left"
                  variant="body1"
                  className={InputValidator.isIcoRateValid(this.props.icoRate) ? "typography_ico_info" : "typography_ico_info_error"}
                >
                  ICO rate.
                </Typography>
              </MuiThemeProvider>
            </Grid>
          </Grid>
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <MuiThemeProvider theme={theme}>
                <TextField
                  required
                  id="outlined-required"
                  label="ICO wallet"
                  className="ico_text_field"
                  margin="normal"
                  variant="outlined"
                  inputProps={{ maxLength: 42 }}
                  value={this.props.icoWallet}
                  error={!InputValidator.isEthereumAddress(this.props.icoWallet)}
                  onChange={this.handleWalletChange}
                />
              </MuiThemeProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiThemeProvider theme={theme}>
                <Typography
                  align="left"
                  variant="body1"
                  className={InputValidator.isEthereumAddress(this.props.icoWallet) ? "typography_ico_info" : "typography_ico_info_error"}
                >
                  ICO wallet.
                </Typography>
              </MuiThemeProvider>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

ICOAttributesPanel.propTypes = {
  icoCapActions: PropTypes.object.isRequired,
  icoRateActions: PropTypes.object.isRequired,
  icoWalletActions: PropTypes.object.isRequired,
  icoCap: PropTypes.string.isRequired,
  icoRate: PropTypes.string.isRequired,
  icoWallet: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    icoCap: state.icoCap,
    icoRate: state.icoRate,
    icoWallet: state.icoWallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    icoCapActions: bindActionCreators(icoCapActions, dispatch),
    icoRateActions: bindActionCreators(icoRateActions, dispatch),
    icoWalletActions: bindActionCreators(icoWalletActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ICOAttributesPanel);

import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  OutlinedInput,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './css/TokenOwner.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as tokenOwnerActions from '../actions/tokenOwnerActions';
import * as tokenOwnerFundsActions from '../actions/tokenOwnerFundsActions';
import { bindActionCreators } from 'redux';
import initialState from '../reducers/initialState';
import ReactGA from 'react-ga';

export class TokenOwner extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    // TODO: remove logging when ga works properly
    console.log("Navigate to: /mint/"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/');
  }

  handleChange(e) {
    this.props.tokenOwnerActions.setTokenOwner(e.target.value);
    // if selected specific account
    if (e.target.value !== initialState.tokenOwner) {
      this.props.tokenOwnerFundsActions.checkFunds(e.target.value);
    }
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

    let error = (this.props.accounts.length === 0 || this.props.tokenOwnerHasInsufficientFunds) && !this.props.loadingAccounts && !this.props.checkingTokenOwnerFunds;
    const metamaskLink = (<a href="https://metamask.io/" rel="noopener noreferrer" target="_blank">metamask.io</a>);

    let menuItems;
    let descriptionText;
    if (this.props.loadingAccounts) {
      menuItems = (
        <MenuItem
          value={initialState.tokenOwner}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#31bfdf'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          Loading accounts...
        </MenuItem>
      );
      descriptionText = "ETH account. This account will be owner of the token!";
    } else if (this.props.accounts.length > 0) {
      menuItems = this.props.accounts.map((account) => (
        <MenuItem
          key={account}
          value={account}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#31bfdf'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          {account}
        </MenuItem>
      ));
      if (this.props.tokenOwnerHasInsufficientFunds) {
        descriptionText = "This account has insufficient funds. Please top up this account, or select another one, and refresh the page.";
      } else {
        descriptionText = "ETH account. This account will be owner of the token!";
      }
    } else {
      menuItems = (
        <MenuItem
          value={initialState.tokenOwner}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#31bfdf'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          No available accounts
        </MenuItem>
      );
      descriptionText = "There are no available accounts. Please make sure that you run Metamask or any other Ethereum wallet with at least one UNLOCKED account, and refresh the page. " +
        "You can download Metamask at";
    }

    return (
      <Card
        className="card"
      >
        <CardHeader
          title="Token Owner"
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
          <Grid container wrap="nowrap" spacing={8}>
            <Grid item xs>
              <MuiThemeProvider theme={theme}>
                <FormControl variant="outlined">
                  <InputLabel>Select account</InputLabel>
                  <Select
                    error={error}
                    value={this.props.tokenOwner}
                    onChange={this.handleChange}
                    input={
                      <OutlinedInput
                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                        className="select_field"
                      />
                    }
                  >
                    {menuItems}
                  </Select>
                </FormControl>
              </MuiThemeProvider>
            </Grid>
            <Grid item xs>
              <Typography
                align="left"
                variant="body1"
                className={error ? "typography_error" : "typography"}
              >
                {descriptionText} {(this.props.accounts.length === 0 && !this.props.loadingAccounts) && metamaskLink}
              </Typography>
              {this.props.tokenOwnerHasInsufficientFunds &&
                <div>
                  <Typography
                    align="left"
                    variant="body1"
                    className="typography_error_secondary"
                  >
                    <strong>Selected account balance:</strong> {this.props.tokenOwnerBalance.toFixed(6)} ETH
                  </Typography>
                  <Typography
                    align="left"
                    variant="body1"
                    className="typography_error_secondary"
                  >
                  <strong>Minimum required balance:</strong> {this.props.serviceFee.toFixed(6)} ETH plus mining fee
                  </Typography>
                </div>
              }
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

TokenOwner.propTypes = {
  tokenOwnerHasInsufficientFunds: PropTypes.bool.isRequired,
  checkingTokenOwnerFunds: PropTypes.bool.isRequired,
  checkingNetwork: PropTypes.bool.isRequired,
  accounts: PropTypes.array.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  tokenOwnerBalance: PropTypes.number.isRequired,
  serviceFee: PropTypes.number.isRequired,
  loadingAccounts: PropTypes.bool.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired,
  tokenOwnerFundsActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    loadingAccounts: state.loadingAccounts,
    tokenOwner: state.tokenOwner,
    tokenOwnerBalance: state.tokenOwnerBalance,
    serviceFee: state.serviceFee,
    checkingNetwork: state.checkingNetwork,
    checkingTokenOwnerFunds: state.checkingTokenOwnerFunds,
    tokenOwnerHasInsufficientFunds: state.tokenOwnerHasInsufficientFunds
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenOwnerActions: bindActionCreators(tokenOwnerActions, dispatch),
    tokenOwnerFundsActions: bindActionCreators(tokenOwnerFundsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenOwner);

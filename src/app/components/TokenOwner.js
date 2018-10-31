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
    let error = (this.props.accounts.length === 0 || !this.props.tokenOwnerHasEnoughFunds) && !this.props.loadingAccounts;

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
      descriptionText = "ETH address (not exchange address). This address will be owner of the token. Please make sure that the selected address is main-net Ethereum address!";
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
      if (this.props.tokenOwnerHasEnoughFunds) {
        descriptionText = "ETH address (not exchange address). This address will be owner of the token. Please make sure that the selected address is main-net Ethereum address!";
      } else {
        descriptionText = "This account has insufficient funds. Please top up this account, or select another one.";
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
      descriptionText = "There are no available accounts. Please make sure that you run Metamask or any other Ethereum wallet with at least one account, and refresh the page.";
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
                variant="caption"
                className={error ? "typography_error" : "typography"}
              >
                {descriptionText}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

TokenOwner.propTypes = {
  accounts: PropTypes.array.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  tokenOwnerHasEnoughFunds: PropTypes.bool.isRequired,
  loadingAccounts: PropTypes.bool.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired,
  tokenOwnerFundsActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    loadingAccounts: state.loadingAccounts,
    tokenOwner: state.tokenOwner,
    tokenOwnerHasEnoughFunds: state.tokenOwnerHasEnoughFunds
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenOwnerActions: bindActionCreators(tokenOwnerActions, dispatch),
    tokenOwnerFundsActions: bindActionCreators(tokenOwnerFundsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenOwner);

import React from 'react';
import './css/ErrorPanel.css';
import { Typography, Card, CardHeader, CardContent } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import * as decimalsActions from '../actions/decimalsActions';
import * as tokenNameActions from '../actions/tokenNameActions';
import * as tokenSymbolActions from '../actions/tokenSymbolActions';
import * as totalSupplyActions from '../actions/totalSupplyActions';
import * as tokenTypeActions from '../actions/tokenTypeActions';
import * as tokenOwnerActions from '../actions/tokenOwnerActions';
import * as appStateActions from '../actions/appStateActions';
import * as payingAccountFundsActions from '../actions/payingAccountFundsActions';
import * as infoMessageActions from '../actions/infoMessageActions';
import * as accountsActions from '../actions/accountsActions';
import * as serviceFeeActions from '../actions/serviceFeeActions';
import * as networkActions from '../actions/networkActions';
import initialState from '../reducers/initialState';
import ReactGA from 'react-ga';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class ErrorPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentDidMount() {
    // TODO: remove logging when ga works properly
    console.log("Navigate to: /mint/error"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/error');
  }

  handleBackClick(e) {
    this.props.decimalsActions.setDecimals(initialState.decimals);
    this.props.tokenNameActions.setTokenName(initialState.tokenName);
    this.props.tokenSymbolActions.setTokenSymbol(initialState.tokenSymbol);
    this.props.totalSupplyActions.setTotalSupply(initialState.totalSupply);
    this.props.tokenTypeActions.setTokenType(initialState.tokenType);
    this.props.tokenOwnerActions.setTokenOwner(initialState.tokenOwner);
    this.props.appStateActions.setAppState(initialState.appState);
    this.props.payingAccountFundsActions.setCheckingPayingAccountFunds(initialState.checkingPayingAccountFunds);
    this.props.payingAccountFundsActions.setPayingAccountHasInsufficientFunds(initialState.payingAccountHasInsufficientFunds);
    this.props.payingAccountFundsActions.setPayingAccountBalance(initialState.payingAccountBalance);
    this.props.infoMessageActions.setInfoMessage(initialState.infoMessage);
    this.props.accountsActions.loadAllAccounts();
    this.props.serviceFeeActions.setServiceFee(initialState.serviceFee);
    this.props.networkActions.getNetworkType();
  }

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      }
    });

    const cardHeaderTitle = this.props.isMobileDevice ? "Error!" : "Oops, Something Went Wrong!";

    return (
      <div>
        <Card className="card">
          <CardHeader
            title={cardHeaderTitle}
            classes={{
              root: "card_header",
              title: "card_header_text"
            }}
            avatar={<FontAwesomeIcon size="2x" className="fa_error_icon" icon={faTimesCircle} />}
          />
          <CardContent
            classes={{
              root: "card_content"
            }}
          >
            <MuiThemeProvider theme={theme}>
              <Typography
                align="center"
                variant="subtitle1"
                className="typography_error_info_message"
              >
                {this.props.infoMessage}
              </Typography>
            </MuiThemeProvider>
          </CardContent>
        </Card>
        <form className="footer_main_form">
          <span
            className="btn btn-err-back wow fadeInUp"
            data-wow-duration="1000ms"
            data-wow-delay="400ms"
            onClick={this.handleBackClick}
          >
            <FontAwesomeIcon className="fa_back_icon" icon={faChevronLeft} />
            Back
        </span>
        </form>
      </div>
    );
  }
}

ErrorPanel.propTypes = {
  isMobileDevice: PropTypes.bool.isRequired,
  infoMessage: PropTypes.string.isRequired,
  decimalsActions: PropTypes.object.isRequired,
  tokenNameActions: PropTypes.object.isRequired,
  tokenSymbolActions: PropTypes.object.isRequired,
  totalSupplyActions: PropTypes.object.isRequired,
  tokenTypeActions: PropTypes.object.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired,
  appStateActions: PropTypes.object.isRequired,
  payingAccountFundsActions: PropTypes.object.isRequired,
  infoMessageActions: PropTypes.object.isRequired,
  accountsActions: PropTypes.object.isRequired,
  serviceFeeActions: PropTypes.object.isRequired,
  networkActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    infoMessage: state.infoMessage,
    isMobileDevice: state.isMobileDevice
  };
}

function mapDispatchToProps(dispatch) {
  return {
    decimalsActions: bindActionCreators(decimalsActions, dispatch),
    tokenNameActions: bindActionCreators(tokenNameActions, dispatch),
    tokenSymbolActions: bindActionCreators(tokenSymbolActions, dispatch),
    totalSupplyActions: bindActionCreators(totalSupplyActions, dispatch),
    tokenTypeActions: bindActionCreators(tokenTypeActions, dispatch),
    tokenOwnerActions: bindActionCreators(tokenOwnerActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    payingAccountFundsActions: bindActionCreators(payingAccountFundsActions, dispatch),
    infoMessageActions: bindActionCreators(infoMessageActions, dispatch),
    accountsActions: bindActionCreators(accountsActions, dispatch),
    serviceFeeActions: bindActionCreators(serviceFeeActions, dispatch),
    networkActions: bindActionCreators(networkActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPanel);

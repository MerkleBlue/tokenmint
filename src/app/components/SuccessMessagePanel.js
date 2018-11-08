import React from 'react';
import './css/SuccessMessagePanel.css';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Tooltip
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCoins, faClipboard } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import * as decimalsActions from '../actions/decimalsActions';
import * as tokenNameActions from '../actions/tokenNameActions';
import * as tokenSymbolActions from '../actions/tokenSymbolActions';
import * as totalSupplyActions from '../actions/totalSupplyActions';
import * as tokenTypeActions from '../actions/tokenTypeActions';
import * as tokenOwnerActions from '../actions/tokenOwnerActions';
import * as appStateActions from '../actions/appStateActions';
import * as tokenOwnerFundsActions from '../actions/tokenOwnerFundsActions';
import * as infoMessageActions from '../actions/infoMessageActions';
import * as accountsActions from '../actions/accountsActions';
import * as serviceFeeActions from '../actions/serviceFeeActions';
import * as networkActions from '../actions/networkActions';
import initialState from '../reducers/initialState';
import ReactGA from 'react-ga';
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class SuccessMessagePanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleCopyToClipboard = this.handleCopyToClipboard.bind(this);
  }

  componentWillMount() {
    // TODO: remove logging when ga works properly
    console.log("Navigate to: /mint/success"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/success');
  }

  handleBackClick(e) {
    this.props.decimalsActions.setDecimals(initialState.decimals);
    this.props.tokenNameActions.setTokenName(initialState.tokenName);
    this.props.tokenSymbolActions.setTokenSymbol(initialState.tokenSymbol);
    this.props.totalSupplyActions.setTotalSupply(initialState.totalSupply);
    this.props.tokenTypeActions.setTokenType(initialState.tokenType);
    this.props.tokenOwnerActions.setTokenOwner(initialState.tokenOwner);
    this.props.appStateActions.setAppState(initialState.appState);
    this.props.tokenOwnerFundsActions.setCheckingTokenOwnerFunds(initialState.checkingTokenOwnerFunds);
    this.props.tokenOwnerFundsActions.setTokenOwnerHasInsufficientFunds(initialState.tokenOwnerHasInsufficientFunds);
    this.props.tokenOwnerFundsActions.setTokenOwnerBalance(initialState.tokenOwnerBalance);
    this.props.infoMessageActions.setInfoMessage(initialState.infoMessage);
    this.props.accountsActions.loadAllAccounts();
    this.props.serviceFeeActions.setServiceFee(initialState.serviceFee);
    this.props.networkActions.getNetworkType();
  }

  // a hack that creates an element outside the screen and uses it to copy its content to clipboard
  handleCopyToClipboard(e) {
    const el = document.createElement('textarea');
    el.value = this.props.infoMessage;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      }
    });

    let etherscanLink;
    let transactionLink;
    const shareUrl = "https://tokenmint.io";
    const twitterTitle = "Just created my own [" + this.props.tokenSymbol + "] Ethereum token using ";
    const telegramTitle = "Just created my own [" + this.props.tokenSymbol + "] Ethereum token!";
    const redditTitle = "Just created my own [" + this.props.tokenSymbol + "] Ethereum token!";
    const whatsappTitle = "Just created my own [" + this.props.tokenSymbol + "] Ethereum token!";
    const linkedinTitle = "Just created my own [" + this.props.tokenSymbol + "] Ethereum token!";
    const linkedinDescription = "You can create your own custom erc20 and erc223 tokens using TokenMint.";
    const emailSubject = "create your own custom Ethereum tokens";
    const emailBody = "I just created my own [" + this.props.tokenSymbol + "] Ethereum token, using TokenMint platform.";

    if (this.props.network === "ropsten") {
      etherscanLink = "https://ropsten.etherscan.io/address/" + this.props.tokenOwner;
      transactionLink = "https://ropsten.etherscan.io/tx/" + this.props.infoMessage;
    } else {
      etherscanLink = "https://etherscan.io/address/" + this.props.tokenOwner;
      transactionLink = "https://etherscan.io/tx/" + this.props.infoMessage;
    }

    const cardHeaderTitle = this.props.isMobileDevice ? "Success!" : "Thank You For Using TokenMint!";

    return (
      <div>
        <Card className="card">
          <CardHeader
            title={cardHeaderTitle}
            classes={{
              root: "card_header",
              title: "card_header_text"
            }}
            avatar={<FontAwesomeIcon size="2x" className="fa_success_icon" icon={faCheckCircle} />}
          />
          <CardContent
            classes={{
              root: "card_content"
            }}
          >
            <MuiThemeProvider theme={theme}>
              <Typography
                align="center"
                variant="body1"
                className="typography_success_info_message"
              >
                Your transaction has been successfully submitted to Ethereum network.
              </Typography>
              <Typography
                align="center"
                variant="body1"
                className="typography_success_info_message"
              >
                Your token creation transaction hash is:
              </Typography>
              <Typography
                align="center"
                variant="body1"
                className="typography_success_info_message"
                classes={{
                  root: "typography_success_info_message_root"
                }}
              >
                <a href={transactionLink} rel="noopener noreferrer" target="_blank">
                  {this.props.infoMessage}
                </a>
                <Tooltip title="Copy to clipboard">
                  <FontAwesomeIcon className="fa_clipboard" icon={faClipboard} onClick={this.handleCopyToClipboard} />
                </Tooltip>
              </Typography>
              <Typography
                align="center"
                variant="body1"
                className="typography_success_info_message"
              >
                Once the mining is finished, you can check your new assets on <a href={etherscanLink} rel="noopener noreferrer" target="_blank">etherscan</a>
              </Typography>
              <Typography
                align="center"
                variant="body1"
                className="typography_success_info_message"
              >
                Share with the world:
              </Typography>
              <div className="share_div" >
                <TwitterShareButton
                  className="button_share"
                  url={shareUrl}
                  title={twitterTitle}
                  via="MerkleBlue"
                >
                  <TwitterIcon
                    size={32}
                    round
                  />
                </TwitterShareButton>
              </div>
              <div className="share_div" >
                <TelegramShareButton
                  className="button_share"
                  url={shareUrl}
                  title={telegramTitle}
                >
                  <TelegramIcon
                    size={32}
                    round
                  />
                </TelegramShareButton>
              </div>
              <div className="share_div" >
                <RedditShareButton
                  className="button_share"
                  url={shareUrl}
                  title={redditTitle}
                >
                  <RedditIcon
                    size={32}
                    round
                  />
                </RedditShareButton>
              </div>
              <div className="share_div" >
                <WhatsappShareButton
                  className="button_share"
                  url={shareUrl}
                  title={whatsappTitle}
                >
                  <WhatsappIcon
                    size={32}
                    round
                  />
                </WhatsappShareButton>
              </div>
              <div className="share_div" >
                <LinkedinShareButton
                  className="button_share"
                  url={shareUrl}
                  title={linkedinTitle}
                  description={linkedinDescription}
                >
                  <LinkedinIcon
                    size={32}
                    round
                  />
                </LinkedinShareButton>
              </div>
              <div className="share_div" >
                <EmailShareButton
                  className="button_share"
                  url={shareUrl}
                  subject={emailSubject}
                  body={emailBody}
                >
                  <EmailIcon
                    size={32}
                    round
                  />
                </EmailShareButton>
              </div>
            </MuiThemeProvider>
          </CardContent>
        </Card>
        <form className="footer_main_form">
          <span
            className="btn btn-success-back wow fadeInUp"
            data-wow-duration="1000ms"
            data-wow-delay="400ms"
            onClick={this.handleBackClick}
          >
            <FontAwesomeIcon className="fa_coins" icon={faCoins} />
            Create More Tokens
          </span>
        </form>
      </div>
    );
  }
}

SuccessMessagePanel.propTypes = {
  isMobileDevice: PropTypes.bool.isRequired,
  network: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  infoMessage: PropTypes.string.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  decimalsActions: PropTypes.object.isRequired,
  tokenNameActions: PropTypes.object.isRequired,
  tokenSymbolActions: PropTypes.object.isRequired,
  totalSupplyActions: PropTypes.object.isRequired,
  tokenTypeActions: PropTypes.object.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired,
  appStateActions: PropTypes.object.isRequired,
  tokenOwnerFundsActions: PropTypes.object.isRequired,
  infoMessageActions: PropTypes.object.isRequired,
  accountsActions: PropTypes.object.isRequired,
  serviceFeeActions: PropTypes.object.isRequired,
  networkActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tokenSymbol: state.tokenSymbol,
    infoMessage: state.infoMessage,
    tokenOwner: state.tokenOwner,
    network: state.network,
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
    tokenOwnerFundsActions: bindActionCreators(tokenOwnerFundsActions, dispatch),
    infoMessageActions: bindActionCreators(infoMessageActions, dispatch),
    accountsActions: bindActionCreators(accountsActions, dispatch),
    serviceFeeActions: bindActionCreators(serviceFeeActions, dispatch),
    networkActions: bindActionCreators(networkActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessMessagePanel);


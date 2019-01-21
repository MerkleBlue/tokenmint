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
import * as payingAccountActions from '../actions/payingAccountActions';
import * as appStateActions from '../actions/appStateActions';
import * as payingAccountFundsActions from '../actions/payingAccountFundsActions';
import * as infoMessageActions from '../actions/infoMessageActions';
import * as accountsActions from '../actions/accountsActions';
import * as serviceFeeActions from '../actions/serviceFeeActions';
import * as networkActions from '../actions/networkActions';
import * as icoRateActions from '../actions/icoRateActions';
import * as icoGoalActions from '../actions/icoGoalActions';
import * as icoCapActions from '../actions/icoCapActions';
import * as icoWalletActions from '../actions/icoWalletActions';
import * as icoOpenCloseTimeActions from '../actions/icoOpenCloseTimeActions';
import * as receiptActions from '../actions/receiptActions';
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

export class ICOSuccessMessagePanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleCopyTxToClipboard = this.handleCopyTxToClipboard.bind(this);
    this.handleCopyWalletToClipboard = this.handleCopyWalletToClipboard.bind(this);
  }

  componentDidMount() {
    // TODO: remove logging when ga works properly
    console.log("Navigate to: /mint/success"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/success');
  }

  handleBackClick(e) {
    this.props.tokenNameActions.setTokenName(initialState.tokenName);
    this.props.tokenSymbolActions.setTokenSymbol(initialState.tokenSymbol);
    this.props.decimalsActions.setDecimals(initialState.decimals);
    this.props.payingAccountFundsActions.setCheckingPayingAccountFunds(initialState.checkingPayingAccountFunds);
    this.props.payingAccountFundsActions.setPayingAccountHasInsufficientFunds(initialState.payingAccountHasInsufficientFunds);
    this.props.payingAccountFundsActions.setPayingAccountBalance(initialState.payingAccountBalance);
    this.props.infoMessageActions.setInfoMessage(initialState.infoMessage);
    this.props.serviceFeeActions.setServiceFee(initialState.serviceFee);
    this.props.payingAccountActions.setPayingAccount(initialState.payingAccount);
    this.props.icoRateActions.setIcoRate(initialState.icoRate);
    this.props.icoGoalActions.setIcoGoal(initialState.icoGoal);
    this.props.icoCapActions.setIcoCap(initialState.icoCap);
    this.props.icoWalletActions.setIcoWallet(initialState.icoWallet);
    this.props.icoOpenCloseTimeActions.setOpeningTime(initialState.icoOpeningTime);
    this.props.icoOpenCloseTimeActions.setClosingTime(initialState.icoClosingTime);
    this.props.receiptActions.setTokenReceipt(initialState.tokenReceipt);
    this.props.receiptActions.setCrowdsaleReceipt(initialState.crowdsaleReceipt);
    this.props.accountsActions.loadAllAccounts();
    this.props.networkActions.getNetworkType();
    this.props.appStateActions.setIcoAppState(initialState.appState);
  }

  // a hack that creates an element outside the screen and uses it to copy its content to clipboard
  handleCopyTxToClipboard(e) {
    const el = document.createElement('textarea');
    el.value = this.props.crowdsaleReceipt.transactionHash;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  handleCopyWalletToClipboard(e) {
    const el = document.createElement('textarea');
    el.value = this.props.icoWallet;
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

    let transactionLink;
    let walletLink;
    const shareUrl = "https://tokenmint.io";
    const twitterTitle = "Just created my own ICO using ";
    const telegramTitle = "Just created my own ICO!";
    const redditTitle = "Just created my own ICO!";
    const whatsappTitle = "Just created my own ICO!";
    const linkedinTitle = "Just created my own ICO!";
    const linkedinDescription = "You can create your own ICO using TokenMint.";
    const emailSubject = "create your own custom ICO";
    const emailBody = "I just created my own ICO, using TokenMint platform.";

    if (this.props.network === "ropsten") {
      transactionLink = "https://ropsten.etherscan.io/tx/" + this.props.crowdsaleReceipt.transactionHash;
      walletLink = "http://ropsten.etherscan.io/address/" + this.props.icoWallet;
    } else {
      transactionLink = "https://etherscan.io/tx/" + this.props.crowdsaleReceipt.transactionHash;
      walletLink = "http://etherscan.io/address/" + this.props.icoWallet;
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
                variant="h6"
                className="typography_success_info_message"
              >
                Your transaction has been successfully submitted to Ethereum network.
              </Typography>
              <Typography
                align="center"
                variant="body1"
                className="typography_success_info_message"
              >
                Your ICO contract creation transaction hash is:
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
                  {this.props.crowdsaleReceipt.transactionHash}
                </a>
                <Tooltip title="Copy to clipboard">
                  <FontAwesomeIcon className="fa_clipboard" icon={faClipboard} onClick={this.handleCopyTxToClipboard} />
                </Tooltip>
              </Typography>
              <Typography
                align="center"
                variant="body1"
                className="typography_success_info_message"
              >
                Once the crowdsale starts, you will sell your tokens by receiving payments on following address:
              </Typography>
              <Typography
                align="center"
                variant="body1"
                className="typography_success_info_message"
              >
                <a href={walletLink} rel="noopener noreferrer" target="_blank">
                  <strong>{this.props.icoWallet}</strong>
                </a>
                <Tooltip title="Copy to clipboard">
                  <FontAwesomeIcon className="fa_clipboard" icon={faClipboard} onClick={this.handleCopyWalletToClipboard} />
                </Tooltip>
              </Typography>
              <Typography
                align="center"
                variant="body1"
                className="typography_success_info_message"
              >
                At the rate of <strong>{this.props.icoRate} ETH</strong> per token
              </Typography>
              <Typography
                align="center"
                variant="body1"
                className="typography_success_info_message"
              >
                If you need help verifying the crowdsale, please contact us at <a href="mailto:merkleblue@gmail.com">merkleblue@gmail.com</a>
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
            Create New ICO
          </span>
        </form>
      </div>
    );
  }
}

ICOSuccessMessagePanel.propTypes = {
  icoWallet: PropTypes.string.isRequired,
  icoRate: PropTypes.string.isRequired,
  isMobileDevice: PropTypes.bool.isRequired,
  network: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  crowdsaleReceipt: PropTypes.object.isRequired,
  tokenOwner: PropTypes.string.isRequired,
  decimalsActions: PropTypes.object.isRequired,
  tokenNameActions: PropTypes.object.isRequired,
  tokenSymbolActions: PropTypes.object.isRequired,
  totalSupplyActions: PropTypes.object.isRequired,
  tokenTypeActions: PropTypes.object.isRequired,
  tokenOwnerActions: PropTypes.object.isRequired,
  payingAccountActions: PropTypes.object.isRequired,
  appStateActions: PropTypes.object.isRequired,
  payingAccountFundsActions: PropTypes.object.isRequired,
  infoMessageActions: PropTypes.object.isRequired,
  accountsActions: PropTypes.object.isRequired,
  serviceFeeActions: PropTypes.object.isRequired,
  networkActions: PropTypes.object.isRequired,
  icoRateActions: PropTypes.object.isRequired,
  icoGoalActions: PropTypes.object.isRequired,
  icoCapActions: PropTypes.object.isRequired,
  icoWalletActions: PropTypes.object.isRequired,
  icoOpenCloseTimeActions: PropTypes.object.isRequired,
  receiptActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tokenSymbol: state.tokenSymbol,
    crowdsaleReceipt: state.crowdsaleReceipt,
    tokenOwner: state.tokenOwner,
    network: state.network,
    isMobileDevice: state.isMobileDevice,
    icoWallet: state.icoWallet,
    icoRate: state.icoRate
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
    payingAccountActions: bindActionCreators(payingAccountActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    payingAccountFundsActions: bindActionCreators(payingAccountFundsActions, dispatch),
    infoMessageActions: bindActionCreators(infoMessageActions, dispatch),
    accountsActions: bindActionCreators(accountsActions, dispatch),
    serviceFeeActions: bindActionCreators(serviceFeeActions, dispatch),
    networkActions: bindActionCreators(networkActions, dispatch),
    icoRateActions: bindActionCreators(icoRateActions, dispatch),
    icoGoalActions: bindActionCreators(icoGoalActions, dispatch),
    icoCapActions: bindActionCreators(icoCapActions, dispatch),
    icoWalletActions: bindActionCreators(icoWalletActions, dispatch),
    icoOpenCloseTimeActions: bindActionCreators(icoOpenCloseTimeActions, dispatch),
    receiptActions: bindActionCreators(receiptActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ICOSuccessMessagePanel);


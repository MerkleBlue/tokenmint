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
import * as icoWalletActions from '../actions/icoWalletActions';
import * as icoOpenCloseTimeActions from '../actions/icoOpenCloseTimeActions';
import * as icoGoalActions from '../actions/icoGoalActions';
import './css/ICOAttributesPanel.css';

export class ICOAttributesPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleCapChange = this.handleCapChange.bind(this);
    this.handleWalletChange = this.handleWalletChange.bind(this);
    this.handleOpeningTimeChange = this.handleOpeningTimeChange.bind(this);
    this.handleClosingTimeChange = this.handleClosingTimeChange.bind(this);
    this.handleGoalChange = this.handleGoalChange.bind(this);
    this.isGoalValid = this.isGoalValid.bind(this);
    this.isCapValid = this.isCapValid.bind(this);
  }

  handleCapChange(e) {
    this.props.icoCapActions.setIcoCap(e.target.value);
  }

  handleWalletChange(e) {
    this.props.icoWalletActions.setIcoWallet(e.target.value);
  }

  handleOpeningTimeChange(e) {
    this.props.icoOpenCloseTimeActions.setOpeningTime(e.target.value);
  }

  handleClosingTimeChange(e) {
    this.props.icoOpenCloseTimeActions.setClosingTime(e.target.value);
  }

  handleGoalChange(e) {
    this.props.icoGoalActions.setIcoGoal(e.target.value);
  }

  isGoalValid() {
    return InputValidator.isIcoGoalValid(this.props.icoGoal) && InputValidator.isCapHigherThanGoal(this.props.icoGoal, this.props.icoCap);
  }

  isCapValid() {
    return InputValidator.isIcoCapValid(this.props.icoCap) && InputValidator.isCapHigherThanGoal(this.props.icoGoal, this.props.icoCap);
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

    let icoOpeningTimeDescription = "ICO opening time. The crowdsale start date.";
    let icoClosingTimeDescription = "ICO closing time. The crowdsale end date";

    if (!InputValidator.isOpeningTimeBeforeClosingTime(this.props.icoOpeningTime, this.props.icoClosingTime)) {
      icoOpeningTimeDescription = "ICO opening time must be set before ICO closing time!";
      icoClosingTimeDescription = "ICO closing time must be set after ICO opening time!";
    }

    if (!InputValidator.isDateValid(this.props.icoOpeningTime)) {
      if (!InputValidator.isDateFormatValid(this.props.icoOpeningTime)) {
        icoOpeningTimeDescription = "Invalid date format!";
      } else if (InputValidator.isDateInPast(this.props.icoOpeningTime)) {
        icoOpeningTimeDescription = "ICO opening time cannot be set in the past!";
      }
    }

    if (!InputValidator.isDateValid(this.props.icoClosingTime)) {
      if (!InputValidator.isDateFormatValid(this.props.icoClosingTime)) {
        icoClosingTimeDescription = "Invalid date format!";
      } else if (InputValidator.isDateInPast(this.props.icoClosingTime)) {
        icoClosingTimeDescription = "ICO closing time cannot be set in the past!";
      }
    }

    let icoGoalDescription = "ICO goal in ETH. If the goal is reached within the ICO time-span, the ICO is considered successful. " +
      "Otherwise, the funds will be returned to the investors.";
    let icoCapDescription = "ICO cap in ETH. If the cap is reached, the ICO gets immediately finalized.";
    if (!InputValidator.isCapHigherThanGoal(this.props.icoGoal, this.props.icoCap)) {
      icoGoalDescription = "Goal must be lower or equal to cap.";
      icoCapDescription = "Cap must be higher or equal to goal";
    }

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
                  label="Goal"
                  className="ico_text_field"
                  margin="normal"
                  variant="outlined"
                  inputProps={{ maxLength: 25 }}
                  value={this.props.icoGoal}
                  error={!this.isGoalValid()}
                  onChange={this.handleGoalChange}
                />
              </MuiThemeProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                align="left"
                variant="body1"
                className={this.isGoalValid() ? "typography_ico_info" : "typography_ico_info_error"}
              >
                {icoGoalDescription}
              </Typography>
            </Grid>
          </Grid>
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
                  error={!this.isCapValid()}
                  onChange={this.handleCapChange}
                />
              </MuiThemeProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                align="left"
                variant="body1"
                className={this.isCapValid() ? "typography_ico_info" : "typography_ico_info_error"}
              >
                {icoCapDescription}
              </Typography>
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
              <Typography
                align="left"
                variant="body1"
                className={InputValidator.isEthereumAddress(this.props.icoWallet) ? "typography_ico_info" : "typography_ico_info_error"}
              >
                {InputValidator.isEthereumAddress(this.props.icoWallet) ?
                  "ICO wallet.The address where investor funds will be stored!" :
                  "Not an Ethereum address."
                }
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <MuiThemeProvider theme={theme}>
                <TextField
                  required
                  id="outlined-required"
                  label="ICO Opening Time"
                  className="ico_text_field"
                  margin="normal"
                  variant="outlined"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.props.icoOpeningTime}
                  error={!InputValidator.isDateValid(this.props.icoOpeningTime) ||
                    !InputValidator.isOpeningTimeBeforeClosingTime(this.props.icoOpeningTime, this.props.icoClosingTime)}
                  onChange={this.handleOpeningTimeChange}
                />
              </MuiThemeProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                align="left"
                variant="body1"
                className={(InputValidator.isDateValid(this.props.icoOpeningTime) &&
                  InputValidator.isOpeningTimeBeforeClosingTime(this.props.icoOpeningTime, this.props.icoClosingTime)) ?
                  "typography_ico_info" : "typography_ico_info_error"}
              >
                {icoOpeningTimeDescription}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <MuiThemeProvider theme={theme}>
                <TextField
                  required
                  id="outlined-required"
                  label="ICO Closing Time"
                  className="ico_text_field"
                  margin="normal"
                  variant="outlined"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.props.icoClosingTime}
                  error={!InputValidator.isDateValid(this.props.icoClosingTime) ||
                    !InputValidator.isOpeningTimeBeforeClosingTime(this.props.icoOpeningTime, this.props.icoClosingTime)}
                  onChange={this.handleClosingTimeChange}
                />
              </MuiThemeProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                align="left"
                variant="body1"
                className={(InputValidator.isDateValid(this.props.icoClosingTime) &&
                  InputValidator.isOpeningTimeBeforeClosingTime(this.props.icoOpeningTime, this.props.icoClosingTime)) ?
                  "typography_ico_info" : "typography_ico_info_error"}
              >
                {icoClosingTimeDescription}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

ICOAttributesPanel.propTypes = {
  icoCapActions: PropTypes.object.isRequired,
  icoGoalActions: PropTypes.object.isRequired,
  icoWalletActions: PropTypes.object.isRequired,
  icoOpenCloseTimeActions: PropTypes.object.isRequired,
  icoCap: PropTypes.string.isRequired,
  icoGoal: PropTypes.string.isRequired,
  icoWallet: PropTypes.string.isRequired,
  icoOpeningTime: PropTypes.string.isRequired,
  icoClosingTime: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    icoCap: state.icoCap,
    icoGoal: state.icoGoal,
    icoWallet: state.icoWallet,
    icoOpeningTime: state.icoOpeningTime,
    icoClosingTime: state.icoClosingTime
  };
}

function mapDispatchToProps(dispatch) {
  return {
    icoCapActions: bindActionCreators(icoCapActions, dispatch),
    icoGoalActions: bindActionCreators(icoGoalActions, dispatch),
    icoWalletActions: bindActionCreators(icoWalletActions, dispatch),
    icoOpenCloseTimeActions: bindActionCreators(icoOpenCloseTimeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ICOAttributesPanel);

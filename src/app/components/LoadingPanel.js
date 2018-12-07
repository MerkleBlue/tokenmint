import React from 'react';
import './css/LoadingPanel.css';
import { Typography, Card, CardHeader, CardContent, LinearProgress } from '@material-ui/core';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class LoadingPanel extends React.Component {

  componentDidMount() {
    // TODO: remove logging when ga works properly
    console.log("Navigate to: /mint/wallet-confirm"); // eslint-disable-line no-console
    ReactGA.pageview('/mint/wallet-confirm');
  }

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      }
    });

    return (
      <div>
        <Card className="card">
          <CardHeader
            title="Approve"
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
            <MuiThemeProvider theme={theme}>
              <Typography
                align="center"
                variant="subtitle1"
              >
                Your transaction is about to be sent.
              </Typography>
              <Typography
                align="center"
                variant="subtitle1"
              >
                Please set the mining fee and confirm token creation in your wallet.
              </Typography>
            </MuiThemeProvider>
          </CardContent>
        </Card>
        <form className="footer_main_form">
          <LinearProgress
            className="linear_progress"
            classes={{
              root: "linear_progress_root"
            }}
          />
        </form>
      </div>
    );
  }
}

LoadingPanel.propTypes = {
  tokenOwner: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    tokenOwner: state.tokenOwner
  };
}

export default connect(mapStateToProps)(LoadingPanel);

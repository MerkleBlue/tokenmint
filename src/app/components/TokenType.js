import React from 'react';
import {
  Grid,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import './css/TokenType.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tokenTypeActions from '../actions/tokenTypeActions';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class TokenType extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.tokenTypeActions.setTokenType(event.target.value);
  }

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      }
    });

    return (
      <Card className="card">
        <CardHeader
          title="Token Type"
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
            <Grid item xs={6} md={6}>
              <RadioGroup
                aria-label="tokenType"
                name="tokenType"
                className="radio_group_token_type"
                value={this.props.tokenType}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="erc20"
                  control={
                    <Radio
                      classes={{
                        checked: "radio_button"
                      }}
                    />
                  }
                  label="ERC20"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="erc223"
                  control={
                    <Radio
                      classes={{
                        checked: "radio_button"
                      }}
                    />
                  }
                  label="ERC223"
                  labelPlacement="start"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={6} md={6}>
              <MuiThemeProvider theme={theme}>
                <Typography
                  align="left"
                  color="textSecondary"
                  variant="body1"
                  className="typography_token_type_erc20"
                >
                  {this.props.isMobileDevice ?
                    "Recommended" :
                    "ERC-20 is recommended option, accepted by most exchanges."
                  }
                </Typography>
                <Typography
                  align="left"
                  color="textSecondary"
                  variant="body1"
                  className="typography_token_type_erc223"
                >
                  {this.props.isMobileDevice ?
                    "Provides extra safety features" :
                    "ERC-223 is similar to ERC-20, but it provides extra safety during token transfers."
                  }
                </Typography>
              </MuiThemeProvider>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

TokenType.propTypes = {
  tokenType: PropTypes.string.isRequired,
  isMobileDevice: PropTypes.bool.isRequired,
  tokenTypeActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tokenType: state.tokenType,
    isMobileDevice: state.isMobileDevice
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenTypeActions: bindActionCreators(tokenTypeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenType);

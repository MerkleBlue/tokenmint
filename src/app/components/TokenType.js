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

export class TokenType extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.tokenTypeActions.setTokenType(event.target.value);
  }

  render() {
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
          <Grid container wrap="nowrap" spacing={8}>
            <Grid item xs>
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
                        checked:"radio_button"
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
                        checked:"radio_button"
                      }}
                    />
                  }
                  label="ERC223"
                  labelPlacement="start"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs>
              <Typography
                align="left"
                color="textSecondary"
                variant="caption"
                className="typography_token_type_erc20"
              >
                ERC-20 is recommended option, accepted by most exchanges.
              </Typography>
              <Typography
                align="left"
                color="textSecondary"
                variant="caption"
                className="typography_token_type_erc223"
              >
                ERC-223 is similar to ERC-20, but it provides extra safety during token transfers.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

TokenType.propTypes = {
  tokenType: PropTypes.string.isRequired,
  tokenTypeActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tokenType: state.tokenType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenTypeActions: bindActionCreators(tokenTypeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenType);

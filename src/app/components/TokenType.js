import React from 'react';
import { Grid, Typography, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import './css/TokenType.css'

class TokenType extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: "erc20"
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <form className="main_form">
        <RadioGroup
          aria-label="tokenType"
          name="tokenType"
          //className={classes.group}
          value={this.state.value}
          onChange={this.handleChange}
        >
          <FormControlLabel
            value="erc20"
            control={<Radio color="primary" />}
            label="ERC20"
            labelPlacement="start"
          />
          <FormControlLabel
            value="erc223"
            control={<Radio color="primary" />}
            label="ERC223"
            labelPlacement="start"
          />
        </RadioGroup>
      </form>
    );
  }
}

export default TokenType;

// <Grid item xs>
// <Typography
//   align="left"
//   color="textSecondary"
//   variant="caption"
// >
//   ERC-20 is recommended option. Accepted by the most exchanges.
// </Typography>
// </Grid>

// </Grid>
//             <Grid item xs>
//               <Typography
//                 align="left"
//                 color="textSecondary"
//                 variant="caption"
//               >
//                 ERC-223 is almost the same as ERC-20. Provides extra safety during token transfers.
//               </Typography>

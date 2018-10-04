import React from 'react';
import { TextField } from '@material-ui/core';

const TokenInfo = () => {
  return (
    <form>
      <TextField
        required
        id="outlined-required"
        label="Token name"
        //className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        required
        id="outlined-required"
        label="Token symbol"
        //className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        required
        id="outlined-required"
        label="Decimals"
        //className={classes.textField}
        margin="normal"
        variant="outlined"
      />
    </form>
  );
};

export default TokenInfo;

import React from 'react';
import { TextField } from '@material-ui/core';

const TokenOwner = () => {
  return (
    <form>
      <TextField
        required
        id="outlined-required"
        label="Token owner"
        //className={classes.textField}
        margin="normal"
        variant="outlined"
      />
    </form>
  );
};

export default TokenOwner;

import React from 'react';
import { TextField } from '@material-ui/core';

const TokenOwner = () => {
  return (
    <form className="main_form">
      <TextField
        required
        id="outlined-required"
        label="Token owner"
        className="text_field"
        margin="normal"
        variant="outlined"
      />
    </form>
  );
};

export default TokenOwner;

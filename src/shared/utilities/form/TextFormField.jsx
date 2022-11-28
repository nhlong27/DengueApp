import React from 'react';
import { getIn } from 'formik';
import { TextField } from '@mui/material';

const TextFormField = ({ field, form, ...props }) => {
  const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <TextField
      style={{width:300}}
      margin="normal"
      helperText={errorText}
      error={!!errorText}
      {...field}
      {...props}
    />
  );
};

export default TextFormField;

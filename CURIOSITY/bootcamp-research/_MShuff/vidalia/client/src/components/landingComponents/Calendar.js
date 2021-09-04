import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { loginStyles } from '../../styles/landing/landing'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    maxWidth: 200,
  },
}));


export default function DatePickers({updateDob}) {
  const classes = useStyles();

  const classes2 = loginStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={updateDob}
        className={classes2.login2}
      />
    </form>
  );
}
import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { loginStyles } from '../../styles/landing/landing'
import { trySignUp } from '../../helpers/auth';
import Calendar from './Calendar';
import { Redirect } from 'react-router-dom';
import { authContext } from '../../Context';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('')
  const [headers, setHeaders] = useState('')
  const { id, setId } = useContext(authContext);

  const classes = loginStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateUsername = e => setUsername(e.target.value);
  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);
  const updateConfirmPassword = e => setConfirmPassword(e.target.value);
  const updateDob = e => setDob(e.target.value);


  const handleSubmit = async() => {
    const data = await trySignUp(username, email, password, confirmPassword, dob)
    if(data.id){
        setId(data.id)
    } else {
        setHeaders(data.message)
    }
  }


  if (id) {
    return <Redirect to="/"/>;
  }

  return (
    <>
        <div className='sign-up-button' onClick={handleClickOpen}>Sign Up</div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Begin your adventure</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    I used to be an adventurer like you, until I took an error to the knee.
                    <div>
                        {!headers ? null : <p className='headers'>{`- ${headers}`}</p>}
                    </div>
                </DialogContentText>
                <div className='sign-up-text-fields-container'>
                    <TextField id="outlined-basic-email" onChange={updateEmail} label="Email" variant="outlined"/>
                    <TextField id="outlined-basic" onChange={updateUsername} label="Username" variant="outlined" className={classes.login}/>
                    <TextField id="outlined-basic-password" onChange={updatePassword} label="Password" type='Password' variant="outlined" className={classes.login}/>
                    <TextField id="outlined-basic-confirm-password" onChange={updateConfirmPassword} label="Confirm Password" type='Password' variant="outlined" className={classes.login}/>
                    <div className='calendar-container'>
                        <Calendar updateDob={updateDob} />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <div onClick={handleSubmit} className='submit-button'>
                    Sign Up
                </div>
            </DialogActions>
        </Dialog>
    </>
  );
}

import React, { useState, useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { loginStyles } from '../../styles/landing/landing'
import { tryLogin } from '../../helpers/auth';
import { Redirect } from 'react-router-dom';
import { authContext } from '../../Context';

const Login = () => {
    const [header, setHeader] = useState('');
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { id, setId } = useContext(authContext);

    const classes = loginStyles();

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = async() => {
        const data = await tryLogin(email, password)
        if(data.id){
            setId(data.id)
        } else {
            setHeader(data.message)
        }
    }

    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassword(e.target.value);


    if (id) {
        return <Redirect to="/"/>;
    }

    return (
        <>
            <div className='log-in-button' onClick={handleClickOpen}>Log In</div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Login"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please enter your email address and password.
                        {!header ? null : <p className='headers'>{`- ${header}`}</p>}
                    </DialogContentText>
                    <div className='login-text-fields-container'>
                        <TextField id="outlined-basic-email" label="Email" onChange={updateEmail} variant="outlined"/>
                        <TextField id="outlined-basic-password" label="Password" type='Password' onChange={updatePassword} variant="outlined" className={classes.login}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div onClick={handleSubmit} className='submit-button'>
                        Submit
                    </div>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default Login;

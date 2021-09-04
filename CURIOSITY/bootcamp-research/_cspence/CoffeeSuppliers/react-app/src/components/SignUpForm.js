import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeAuthDialog, openSignIn } from '../store/actions/ui';

// TODO : set anchor ref, pass through props if possible
const SignUpForm = (props) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const changeUsername = e => {
        setUsername(e.target.value);
    }

    const changeEmail = e => {
        setEmail(e.target.value);
    }

    const changePassword = e => {
        setPassword(e.target.value);
    }

    const changeConfirmPassword = e => {
        setConfirmPassword(e.target.value);
    }

    const changeAddress = e => {
        setAddress(e.target.value);
    }

    const changePhone = e => {
        setPhone(e.target.value);
    }

    const handleClose = e => {
        dispatch(closeAuthDialog());
    }

    const handleSignUp = e => {
        // TODO : Sign Up User
        handleClose();
    }

    const handleSignIn = e => {
        dispatch(openSignIn());
    }

    return (
        <Dialog>
            <DialogTitle>
                Sign Up
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Username"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={changeUsername}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={changeEmail}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={changePassword}
                />
                {/* TODO: Replace Address TextField with Google Maps autocomplete text field */}
                <TextField
                    autoFocus
                    margin="dense"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={confirmPassword}
                    onChange={changeConfirmPassword}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Address"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={address}
                    onChange={changeAddress}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Phone Number"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={changePhone}
                />
                <DialogContentText>
                    Already have an account? <span onClick={handleSignIn}>Sign In</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSignUp} color="primary">
                    Sign Up
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SignUpForm;

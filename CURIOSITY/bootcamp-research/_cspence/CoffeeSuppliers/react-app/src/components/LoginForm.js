import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { closeAuthDialog, openSignUp } from '../store/actions/ui';

// TODO : set anchor ref, pass through props if possible
const LoginForm = (props) => {
    const ui = useSelector(state => state.ui);
    const [email, setEmail] = useState('demo1@aa.io');
    const [password, setPassword] = useState('password');
    const dispatch = useDispatch();

    const changeEmail = e => {
        setEmail(e.target.value);
    }

    const changePassword = e => {
        setPassword(e.target.value);
    }

    const handleSignUp = e => {
        dispatch(openSignUp());
    }

    const handleCloseSignIn = e => {
        dispatch(closeAuthDialog());
    }

    const handleSignIn = e => {
        // TODO : Sign In User
        handleCloseSignIn();
    }

    return (
        <Dialog>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
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
                    id="name"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={changePassword}
                />
                <DialogContentText>Don't have an account? <span onClick={handleSignUp}>Sign Up</span></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseSignIn} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSignIn} color="primary">
                    Sign In
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LoginForm;

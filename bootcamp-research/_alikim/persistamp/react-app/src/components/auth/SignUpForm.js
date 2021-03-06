import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { TextField, Button } from '@material-ui/core';
import { ActionOrCancelButtons } from '../forms/FormInputs';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import ErrorMessages from '../mylib/ErrorMessages'

const SignUpForm = ({ auth, setAuth, setUser }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = useState([])


  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          birthday,
          username,
          email,
          password,
        }),
      });
      const user = await response.json();
      if (!user.errors) {
        setUser(user)
        setAuth(true)
        setOpen(false)
      } else {
        setErrors(user.errors)
      }
    };
  }

  const updateFirstName = (e) => setFirstName(e.target.value)
  const updateLastName = (e) => setLastName(e.target.value)
  const updateBirthday = (e) => setBirthday(e.target.value)
  const updateUsername = (e) => setUsername(e.target.value)
  const updateEmail = (e) => setEmail(e.target.value)
  const updatePassword = (e) => setPassword(e.target.value)
  const updateRepeatPassword = (e) => setRepeatPassword(e.target.value)

  if (auth) return <Redirect to="/" />

  return (<>

    <Button className='signUpButton' onClick={handleClickOpen} color="secondary" variant="contained">
      Sign up
    </Button>
    <Dialog open={open} onClose={handleClose}
      PaperProps={{
        style: { backgroundColor: "#FFD1D6" }
      }}
    >
      <DialogTitle id="form-dialog-title">Make an account</DialogTitle>

      <ErrorMessages errors={errors} />

      <DialogContent className='orm'>
        <TextField
          autoFocus
          defaultValue={first_name}
          margin="dense"
          id="first_name"
          label="First name"
          type="text"

          onChange={updateFirstName}
          required
        />
        <TextField
          autoFocus
          defaultValue={last_name}
          margin="dense"
          id="last_name"
          label="Last name"
          type="text"
          onChange={updateLastName}
          required
        />
        {/* <TextField
          id="birthday"
          label="Birthday"
          type="date"
          defaultValue={birthday}
          onChange={updateBirthday}
          InputLabelProps={{
            shrink: true,
          }}
        /> */}
        <TextField
          autoFocus
          defaultValue={username}
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          onChange={updateUsername}
          required
        />
        <TextField
          autoFocus
          defaultValue={email}
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          onChange={updateEmail}
          required
        />
        <TextField
          autoFocus
          defaultValue={password}
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          onChange={updatePassword}
          required
        />
        <TextField
          autoFocus
          defaultValue={repeatPassword}
          margin="dense"
          id="repeat_password"
          label="Confirm password"
          type="password"
          fullWidth
          onChange={updateRepeatPassword}
          required
        />
        <ActionOrCancelButtons handleClose={handleClose} onAction={onSignUp} action={"Sign up"} />
      </DialogContent>
    </Dialog>
  </>);
};

export default SignUpForm

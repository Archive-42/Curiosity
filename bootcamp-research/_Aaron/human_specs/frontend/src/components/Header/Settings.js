import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AuthContext } from "../../context/Context";
import * as sessionActions from "../../store/actions/session";

import Button from "@material-ui/core/Button";
// import TextField from '@material-ui/core/TextField';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";

const Settings = (props) => {
  const { setAuthDialog } = useContext(AuthContext);
  const history = useHistory();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState();

  const handleApply = () => {
    setAuthDialog(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.logoutUser()).catch((res) => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    });
    setAuthDialog(false);
    history.push("/");
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">Settings</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* BONUS: fillout settings */}
          Click Signout to signout.
        </DialogContentText>
      </DialogContent>
      {props.user && (
        <DialogActions>
          <Button onClick={handleLogout}>
            <Typography>Signout</Typography>
          </Button>
        </DialogActions>
      )}
      <DialogActions>
        <Button onClick={() => setAuthDialog(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleApply()} color="primary">
          Apply?
        </Button>
      </DialogActions>
    </>
  );
};

export default Settings;

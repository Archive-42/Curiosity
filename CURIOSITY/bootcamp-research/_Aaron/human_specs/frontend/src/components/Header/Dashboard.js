import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/Context";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Paper: {
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  Button: {
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Dashboard = (props) => {
  const { setAuthDialog } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (path) => {
    history.push(path);
    props.setParams(props.getParams());
    setAuthDialog(false);
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">DashBoard</DialogTitle>
      <DialogContent>
        <DialogContentText>Please select a test below.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={3}>
          <Grid item xs={6} lg={12}>
            <Button
              onClick={() => handleClick("/reaction")}
              className={classes.Button}
            >
              Reaction
            </Button>
          </Grid>
          <Grid item xs={6} lg={12}>
            <Button
              onClick={() => handleClick("/typing")}
              className={classes.Button}
            >
              Typing
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default Dashboard;

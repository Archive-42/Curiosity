import React, { useContext } from "react";

import { AuthContext } from "../../context/Context";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";

const Help = (props) => {
  const { setAuthDialog } = useContext(AuthContext);

  console.log(props.getParams());

  const renderDialog = (dialog) => {
    switch (dialog) {
      case "dashboard":
        return (
          <Typography>
            This is the dashboard page. Click on a test to see your stats.
          </Typography>
        );
      case "reaction":
        return (
          <Typography>
            This is the reaction testing page. Click in the field to begin.
            Then, wait for the field to turn green to click.
          </Typography>
        );
      case "typing":
      default:
        return (
          <Typography>
            This is the typing test page. Click in the field to begin typing.
            The big number in the background is the time spent on this prompt,
            and the little numbers represents words typed compared to how many
            words there are.
          </Typography>
        );
    }
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">Help</DialogTitle>
      <DialogContent>
        <DialogContentText>{renderDialog(props.getParams())}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAuthDialog(false)} color="primary">
          Got it!
        </Button>
      </DialogActions>
    </>
  );
};

export default Help;

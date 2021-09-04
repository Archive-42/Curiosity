import React, { useEffect, useState, useRef } from "react";

//components
import Grid from "./Grid";

//MUI
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((props) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    width: "60rem",
    height: "40rem",
    borderRadius: "1rem",

    backgroundColor: "rgba(140, 94, 215, .5)",
  },
}));

const Memory = (props) => {
  const classes = useStyles();

  const [level, setLevel] = useState(1);

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <Grid level={level} setLevel={setLevel} />
    </div>
  );
};

export default Memory;

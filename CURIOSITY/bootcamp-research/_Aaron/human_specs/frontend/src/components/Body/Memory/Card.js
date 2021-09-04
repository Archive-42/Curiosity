import React, { useState } from "react";

import { useSpring, animated as a } from "react-spring";

//MUI
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((props) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    width: "5rem",
    height: "5rem",
    borderRadius: "1rem",
    backgroundColor: "rgba(140, 94, 215, .5)",
  },
}));

const Card = (props) => {
  const classes = useStyles();

  const [flipped, setFlipped] = useState(false);

  return (
    <div>
      <Typography>{props.number ? props.number : 1}</Typography>
    </div>
  );
};

export default Card;

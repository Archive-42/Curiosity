import React, { useState, useRef } from "react";

//MUI
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((props) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    width: "60rem",
    height: "30rem",
    borderRadius: "1rem",

    backgroundColor: "rgba(140, 94, 215, .5)",
  },
}));

const generateRand = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

const generateSequence = () => {
  const arr = [];

  // populate array
  for (let i = 1; i <= 50; i++) {
    arr.push([generateRand(0, 3), generateRand(0, 3)]);
  }

  console.log(arr);
};

const Grid = (props) => {
  const classes = useStyles();

  const sequence = useRef(generateSequence());
  const [currentCard, setCurrentCard] = useState();

  // play sequence
  const flipCard = () => {};

  const playSequence = async () => {
    for (let i = 0; i < props.level; i++) {
      setTimeout(flipCard(), 1000);
    }
  };

  return <></>;
};

export default Grid;

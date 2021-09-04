import React from "react";

import { Button, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  word: {
    display: "inline-block",
    height: "fit-content",
    alignItems: "center",
    padding: "0 .3rem",
  },
  letter: {
    display: "inline-block",
    fontSize: "1.75rem",
    padding: "0 .5px",
  },
}));
const Words = (props) => {
  const classes = useStyles();
  const prompt = props.prompt.join(" ");
  const letters = prompt.split("");

  return (
    <div className={classes.word}>
      {letters.map((letter, idx) => {
        let color = "#8C5ED7";
        let space = "rgba(0, 0, 0, 0)";

        if (props.input[idx] == letter) {
          color = props.errors[idx] == true ? "#C8323E" : "#4C8000";
          if (props.errors[idx] == true) space = "rgba(200, 50, 62, 0.5)";
        }

        if (letter === " ") {
          return (
            <Typography
              style={{
                backgroundColor: space,
                padding: "1rem 4px",
              }}
              key={idx}
              className={classes.letter}
            >
              {letter}
            </Typography>
          );
        }

        return (
          <Typography
            style={{
              color: color,
            }}
            key={idx}
            className={classes.letter}
          >
            {letter}
          </Typography>
        );
      })}
    </div>
  );
};

export default Words;

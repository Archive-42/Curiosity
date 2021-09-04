import React, { useEffect, useRef, useState } from "react";
import * as statActions from "../../../store/actions/stats";
import { useDispatch, useSelector } from "react-redux";

//MUI
import { Button, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((props) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    width: "60rem",
    height: "40rem",
    borderRadius: "1rem",
  },
  results: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: "1rem",

    minwidth: "60rem",
    maxWidth: "80rem",
    padding: "2rem",
  },
}));
const Green = "#C8323E";
const Red = "#4C8000";
const Default = "rgba(140, 94, 215, .5)";

const ReactionField = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeInterval, setTimeInterval] = useState(0);
  const [changed, setChanged] = useState(false);
  const [started, setStarted] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [finished, setFinished] = useState(false);

  const count = useRef({
    time: 0,
    data: 0,
  });

  const randomNumber = () => {
    return Math.random() * (6000 - 500) + 500;
  };

  const handleChange = () => {
    console.log("changed!");
    setChanged(true);

    const startTime = Date.now();
    setTimeInterval(
      setInterval(function () {
        const elapsedTime = Date.now() - startTime;
        count.current.time = (elapsedTime / 1000).toFixed(3);
      }, 10)
    );
  };

  const handleRestart = () => {
    count.current.attempts = 0;
    setStarted(false);
    setChanged(false);
    setClicked(false);
  };

  const handleClick = (e) => {
    if (started) {
      if (changed) {
        clearInterval(timeInterval);

        count.current.data =
          count.current.time >= 1000 ? 1000 : count.current.time;
        setClicked(true);

        setTimeout(function () {
          handleRestart();
        }, 2000);
      } else {
        clearInterval(timeInterval);
        setClicked(true);
        setTimeInterval(null);

        setTimeout(function () {
          count.current.data = 1000;
          handleRestart();
        }, 2000);
      }
      handleSubmit();
    } else {
      const wait = randomNumber();
      setStarted(true);

      setTimeout(function () {
        handleChange();
      }, wait);
    }
  };

  const getCount = () => {
    return count.current.data;
  };

  const handleDisplay = () => {
    if (started) {
      if (clicked) {
        return changed ? `${getCount()} ms` : "False Start.";
      }
      if (changed) {
        return "Click!";
      }
      return "Wait for Green";
    }
    return "Click to begin.";
  };

  const handleSubmit = () => {
    const stats = {
      id: user.id,
      reaction_score: count.current.data,
    };
    if (user) {
      dispatch(statActions.updateUserStats(stats, statActions.SET_REACTION));
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, [user]);

  return (
    isLoaded && (
      <>
        {
          <div
            className={classes.root}
            style={{
              backgroundColor: `${started ? (changed ? Red : Green) : Default}`,
            }}
            onClick={() => handleClick()}
          >
            {<Typography>{handleDisplay()}</Typography>}
          </div>
        }
      </>
    )
  );
};

export default ReactionField;

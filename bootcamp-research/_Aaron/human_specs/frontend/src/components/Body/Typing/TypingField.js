import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as statActions from "../../../store/actions/stats";

//Components
import Words from "./Word";

//MUI
import { Button, makeStyles, Typography } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((props) => ({
  "& > *": {
    boxSizing: "border-box",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
  },

  blur: {
    filter: "blur(4px)",
    marginBottom: "1rem",
    marginLeft: "calc(1rem + 2px)",
    marginRight: "calc(1rem + 2px)",
  },
  hide: {
    opacity: "0",
  },
  clickHere: {
    position: "relative",
    top: "2.5rem",
    // left: '25rem',
  },
  active: {
    backgroundColor: "grey",
  },

  container: {
    padding: "1rem",
    borderRadius: ".5rem",
  },
  typingField_wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  timer: {
    width: "fit-content",
    height: "18rem",
    opacity: "0.2",
    filter: "blur(3px)",

    fontSize: "20rem",
  },
  wordCount: {
    position: "relative",
    bottom: "5rem",
    // top: '4rem',
  },
  indicator_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    position: "absolute",
    top: "20vh",
  },

  prompt: {
    marginBottom: "1rem",
    marginLeft: "calc(1rem + 2px)",
    marginRight: "calc(1rem + 2px)",
  },
  input: {
    backgroundColor: "transparent",
    position: "absolute",
    border: "2px solid blue",
    outline: "none",
    margin: "auto",
    padding: ".5rem 1rem",
    resize: "none",
    borderRadius: ".5rem",
    opacity: "0",
  },
}));

// TYPINGFIELD COMPONENT
const TypingField = (props) => {
  const faker = require("faker");
  const randomWords = require("random-words");

  const dispatch = useDispatch();
  const classes = useStyles();

  //Component States
  const { settings } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [timeInterval, setTimeInterval] = useState();
  const [started, setStarted] = useState(false);
  const [blur, setBlur] = useState(true);

  const [prompt, setPrompt] = useState([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [letterIdx, setLetterIdx] = useState(0);

  //For data collection
  const [letterCount, setLetterCount] = useState(0);
  const [time, setTime] = useState(0);
  const [errors, setErrors] = useState(0);

  //COMPONENT FUNCTIONS
  const initializeErrors = () => {
    const initialErrors = {};
    for (let i = 0; i < prompt.join(" ").length; i++) {
      initialErrors[i] = false;
    }
    setErrors(initialErrors);
  };

  const generatePrompt = async (settings) => {
    // const generatedWords = faker.random.words(props.settings.wordLimit).toLowerCase();
    const generatedWords = randomWords({
      exactly: props.settings.wordLimit,
      maxLength: props.settings.maxLength,
      formatter: (word) => {
        if (props.settings.upperCase) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      },
      join: " ",
    });

    const wordsArr = generatedWords.split(" ");
    const letterArr = generatedWords.split("");

    initializeErrors();
    setLetterIdx(0);
    setLetterCount(letterArr.length);
    setPrompt(wordsArr);
  };

  const startTimer = () => {
    if (!started) {
      let count = 0;
      setTimeInterval(
        setInterval(() => {
          count += 1;
          setTime(count);
        }, 1000)
      );
    }
  };

  const stopTimer = () => {
    clearInterval(timeInterval);
    setTime(0);
  };

  const handleInput = (e) => {
    e.target.value = e.target.value[e.target.value.length - 1];
    startTimer();
    setStarted(true);

    if ((input + e.target.value).length === prompt.join(" ").length) {
      completeTest();
      return;
    } else {
      if (e.target.value === prompt.join(" ")[letterIdx]) {
        if (e.target.value === " ") setWordIdx(wordIdx + 1);

        setInput(input + e.target.value);
        setLetterIdx(letterIdx + 1);
      } else {
        const newErrors = errors;
        newErrors[letterIdx] = true;
        setErrors(newErrors);
      }
    }
  };

  const handleClick = () => {
    setBlur(false);
    const inputField = document.getElementsByClassName(classes.input);
    inputField[0].focus();
  };

  const handleClickAway = () => {
    setBlur(true);
  };

  const handleRestart = () => {
    setInput("");
    stopTimer();
    setWordIdx(0);
    setLetterIdx(0);
    setStarted(false);
    initializeErrors();
  };

  const completeTest = () => {
    let errorCount = 0;
    Object.keys(errors).forEach((key) => {
      if (errors[key]) errorCount += 1;
    });

    const speed = Math.floor(prompt.length / (time / 60));
    const score = speed * props.settings.wordLimit - errorCount;

    const data = {
      id: props.id,
      speed: speed,
      errors: errorCount,
      score: score,
      letters: letterCount,
      time: (time / 60).toFixed(2),
    };
    console.log(data);
    dispatch(statActions.updateUserStats(data, statActions.SET_TYPING));
    generatePrompt();
    handleRestart();
  };

  useEffect(() => {
    generatePrompt(settings);
    setIsLoaded(true);
  }, []);

  return (
    isLoaded && (
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.root}>
          <div
            id="typingField_wrapper"
            className={classes.typingField_wrapper}
            onClick={handleClick}
          >
            <Typography
              variant="h5"
              color="primary"
              className={blur ? classes.clickHere : classes.hide}
            >
              Click to begin
            </Typography>

            {started && (
              <div className={classes.indicator_container}>
                <Typography color="primary" className={classes.timer}>
                  {time}{" "}
                </Typography>
                <Typography color="primary" className={classes.wordCount}>
                  {wordIdx + 1}/{settings.wordLimit}
                </Typography>
              </div>
            )}

            <div className={blur ? classes.blur : classes.prompt}>
              {<Words prompt={prompt} errors={errors} input={input} />}
            </div>

            <textarea
              spellCheck="false"
              className={classes.input}
              onChange={(e) => handleInput(e)}
              value={input}
            />
          </div>

          <Button
            onClick={() => {
              handleRestart();
              handleClickAway();
            }}
          >
            Restart
          </Button>
        </div>
      </ClickAwayListener>
    )
  );
};

export default TypingField;

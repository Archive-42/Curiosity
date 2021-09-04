import React, { useEffect, useState } from "react";

//Components
import PracticeField from "./TypingField";

//MUI
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: "inherit",
  },
  practice_layout: {
    minwidth: "60rem",
    maxWidth: "80rem",
    padding: "2rem",
  },
}));

const initialSettings = {
  wordLimit: 30,
  maxLength: 5,
  upperCase: false,
  punctuation: false,
};

const TypingRoot = (props) => {
  const user = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);
  const [settings, setSettings] = useState(initialSettings);
  const classes = useStyles();

  useEffect(() => {
    setIsLoaded(true);
  }, [user]);

  return (
    isLoaded && (
      <div className={classes.root}>
        <section className={classes.practice_layout}>
          <PracticeField id={user ? user.id : user} settings={settings} />
        </section>
      </div>
    )
  );
};

export default TypingRoot;

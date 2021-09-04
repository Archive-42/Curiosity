const styles = (theme) => ({
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
    top: "5rem",
    // left: '25rem',
  },
  active: {
    backgroundColor: theme.action.active,
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
    opacity: "0.5",
    filter: "blur(3px)",

    fontSize: "15rem",
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
  correctLetter: {
    color: theme.success,
  },
  incorrectLetter: {
    color: theme.error,
    // borderBottom: '1px solid red'
    borderBottom: `1px solid ${theme.error}`,
  },
});

export default styles;

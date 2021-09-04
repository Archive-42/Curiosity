const STATE_KEY = 'tasks';

export const loadState = () => {
  // TODO: Try to access the stored tasks state from local storage
  try {
    const stateJSON = localStorage.getItem(STATE_KEY);
    // TODO: If there is no state found, return `undefined`
    if (!stateJSON) {
      return undefined;
    }
    // TODO: If the state was found, return the state (parsed into JavaScript)
    return JSON.parse(stateJSON);
    // TODO: Catch any errors with a `console.warn` statement and return undefined
  } catch (err) {
    console.warn(err);
    return undefined;
  }
};

export const saveState = (state) => {
  // TODO: Try to parse the state from JavaScript into a JSON string
  try {
    const stateJSON = JSON.stringify(state);
    // TODO: Set the JSON string into local storage
    localStorage.setItem(STATE_KEY, stateJSON);
    // TODO: Catch any errors with a `console.warn` statement
  } catch (err) {
    console.warn(err);
  }
};

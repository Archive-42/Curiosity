const TEN_MINUTES = 600000;

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("skibrite-redux-state");
    if (serializedState === null) {
      return undefined;
    }
    const { state, lastSavedAt } = JSON.parse(serializedState);
    // if last saved longer than 10 mins ago
    if (!lastSavedAt || lastSavedAt < Date.now() - TEN_MINUTES) {
      return undefined;
    }
    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify({
      state: {
        session: state.session,
        events: state.events,
        categories: state.categories,
      },
      lastSavedAt: Date.now(),
    });
    localStorage.setItem("skibrite-redux-state", serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

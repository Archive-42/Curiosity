import { fetch } from "../csrf";
// import { connect }

//Store Action Types
export const SET_TYPING = "api/typing";
export const SET_REACTION = "api/reaction";
export const SET_MEMORY = "api/memory";
export const REMOVE_STATS = "human_specs/stats/REMOVE_STATS";

//Store Actions
export const setUserStats = (stats, type) => ({ type: type, payload: stats });

export const loadUserStats = (id) => async (dispatch) => {
  try {
    const res = await fetch(`api/users/stats/${id}`);

    if (res.ok) {
      console.log("Incoming data: ", res.data);
      dispatch(setUserStats(res.data.typing, SET_TYPING));
      dispatch(setUserStats(res.data.reaction, SET_REACTION));
      // dispatch(setUserStats(res.data.memory, SET_MEMORY))
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
  }
};

export const updateUserStats = (stats, test) => async (dispatch) => {
  try {
    const res = await fetch(`${test}`, {
      method: "POST",
      body: JSON.stringify(stats),
    });

    //TODO: use current user instead of 1.
    res.ok && dispatch(loadUserStats(1));
  } catch (e) {
    console.error(e);
  }
};

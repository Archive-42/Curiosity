const LOAD_AILMENTS = "LOAD_AILMENTS";

export const loadAilments = (data) => ({
  type: LOAD_AILMENTS,
  data,
});

export default function ailmentsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_AILMENTS:
      return action.data;

    default: {
      return state;
    }
  }
}

const LOAD_NPCS = "LOAD_NPCS";

export const loadNPCs = (data) => ({
  type: LOAD_NPCS,
  data,
});

export default function npcsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_NPCS: {
      return action.data;
    }
    default: {
      return state;
    }
  }
}

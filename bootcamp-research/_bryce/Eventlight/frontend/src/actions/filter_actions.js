export const UPDATE_FILTER = "UPDATE_FILTER";
export const CLEAR_FILTERS = "CLEAR_FILTERS";

export const updateFilter = filter => {
  return {
    type: UPDATE_FILTER,
    filter
  };
};

export const clearFilters = () => {
  return {
    type: CLEAR_FILTERS
  };
};
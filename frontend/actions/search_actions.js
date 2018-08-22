export const CLEAR_SEARCH = "CLEAR_SEARCH";

const removeSearch = () => {
  return {
    type: CLEAR_SEARCH
  };
};

export const clearSearch = () => {
  return dispatch => {
    dispatch(removeSearch());
  };
};

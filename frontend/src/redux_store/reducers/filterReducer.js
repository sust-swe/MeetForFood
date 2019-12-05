import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  suggestion: {},
  dataError: null,
  dataLoading: false
};

const getFilteredStart = (state, action) => {
  return updateObject(state, {
    dataError: null,
    dataLoading: true
  });
};

const getDataSuccess = (state, action) => {
  return updateObject(state, {
    suggestion: action.suggestion.data,
    dataError: null,
    dataLoading: false
  });
};

const setFilterSuccess = (state, action) => {
  return updateObject(state, {
    dataError: null,
    dataLoading: false
  });
};

const getDataFail = (state, action) => {
  return updateObject(state, {
    dataError: action.error,
    dataLoading: false
  });
};

const getSuggestedFriends = (state, action) => {
  return updateObject(state, {
    suggestion: action.data.data,
    dataLoading: true
  });
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_FILTER_START:
      return getFilteredStart(state, action);
    case actionType.GET_FILTER_SUCCESS:
      return getDataSuccess(state, action);
    case actionType.SET_FILTER_SUCCESS:
      return setFilterSuccess(state, action);
    case actionType.GET_FILTER_FAIL:
      return getDataFail(state, action);
    case actionType.GET_FILTER:
      return getSuggestedFriends(state, action);
    default:
      return state;
  }
};

export default filterReducer;

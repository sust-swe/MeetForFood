import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  suggestion: [],
  filterInfo: {},
  filterError: null,
  filterLoading: false,
  filterDataLoading: false
};

const getFilteredStart = (state, action) => {
  return updateObject(state, {
    filterError: null,
    filterLoading: true
  });
};

const getFilterSuccess = (state, action) => {
  return updateObject(state, {
    suggestion: action.suggestion.data,
    filterError: null,
    filterLoading: false
  });
};

const setFilterSuccess = (state, action) => {
  return updateObject(state, {
    filterInfo: action.filterInfo.data,
    filterError: null,
    filterLoading: false
  });
};

const getFilterSetting = (state, action) => {
  return updateObject(state, {
    filterInfo: action.filterInfo.data,
    filterError: null,
    filterDataLoading: false
  });
};

const getFilterSettingStart = (state, action) => {
  return updateObject(state, {
    filterError: null,
    filterDataLoading: true
  });
};

const filterFail = (state, action) => {
  return updateObject(state, {
    filterError: action.error,
    filterLoading: false
  });
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_FILTER_START:
      return getFilteredStart(state, action);
    case actionType.GET_FILTER_SETTING_START:
      return getFilterSettingStart(state, action);
    case actionType.GET_FILTER_SUCCESS:
      return getFilterSuccess(state, action);
    case actionType.SET_FILTER_SUCCESS:
      return setFilterSuccess(state, action);
    case actionType.GET_FILTER_FAIL:
      return filterFail(state, action);
    case actionType.GET_FILTER_SETTING:
      return getFilterSetting(state, action);
    default:
      return state;
  }
};

export default filterReducer;

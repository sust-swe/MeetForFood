import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  data: [],
  dataError: null,
  dataLoading: false
};

const getDataStart = (state, action) => {
  return updateObject(state, {
    dataError: null,
    dataLoading: true
  });
};

const getDataSuccess = (state, action) => {
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

const getUserData = (state, action) => {
  return updateObject(state, {
    data: action.data.data,
    dataLoading: false
  });
};

const setImage = (state, action) => {
  return updateObject(state, {
    dataLoading: false
  });
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_DATA_START:
      return getDataStart(state, action);
    case actionType.GET_DATA_SUCCESS:
      return getDataSuccess(state, action);
    case actionType.GET_DATA_FAIL:
      return getDataFail(state, action);
    case actionType.GET_DATA:
      return getUserData(state, action);
    case actionType.SET_IMAGE:
      return setImage(state, action);
    default:
      return state;
  }
};

export default dataReducer;

import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  friendList: [],
  requestList: [],
  dataError: null,
  dataLoading: false
};

const getListStart = (state, action) => {
  return updateObject(state, {
    dataError: null,
    dataLoading: true
  });
};

const requestStart = (state, action) => {
  return updateObject(state, {
    dataError: null,
    dataLoading: true
  });
};

const requestSuccesss = (state, action) => {
  return updateObject(state, {
    dataError: null,
    dataLoading: false
  });
};

const requestFail = (state, action) => {
  return updateObject(state, {
    dataError: action.error,
    dataLoading: false
  });
};

const getListSuccess = (state, action) => {
  return updateObject(state, {
    friendList: action.friendList,
    dataError: null,
    dataLoading: false
  });
};

const getRequestListSuccess = (state, action) => {
  return updateObject(state, {
    requestList: action.requestList,
    dataError: null,
    dataLoading: false
  });
};

const getListFail = (state, action) => {
  return updateObject(state, {
    dataError: action.error,
    dataLoading: false
  });
};

const friendRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_LIST:
      return getListStart(state, action);
    case actionType.GET_LIST_SUCCESS:
      return getListSuccess(state, action);
    case actionType.GET_LIST_FAIL:
      return getListFail(state, action);
    case actionType.GET_REQUEST_LIST_SUCCESS:
      return getRequestListSuccess(state, action);
    case actionType.REQUEST_START:
      return requestStart(state, action);
    case actionType.REQUEST_SUCCESS:
      return requestSuccesss(state, action);
    case actionType.REQUEST_FAIL:
      return requestFail(state, action);
    default:
      return state;
  }
};

export default friendRequestReducer;

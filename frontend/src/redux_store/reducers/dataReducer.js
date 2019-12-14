import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  data: [],
  image: {},
  restaurants: [],
  dataError: null,
  dataLoading: false,
  profileLoading: false,
  imageLoading: false
};

const getDataStart = (state, action) => {
  return updateObject(state, {
    dataError: null,
    dataLoading: true
  });
};

const profileDataStart = (state, action) => {
  return updateObject(state, {
    dataError: null,
    profileLoading: true
  });
};

const profileDataSuccess = (state, action) => {
  return updateObject(state, {
    dataError: null,
    profileLoading: false
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
    dataLoading: false,
    profileLoading: false
  });
};

const getImageDataStart = (state, action) => {
  return updateObject(state, {
    imageLoading: true
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

const getImage = (state, action) => {
  return updateObject(state, {
    image: action.data.data,
    imageLoading: false
  });
};

const getRestaurants = (state, action) => {
  return updateObject(state, {
    restaurants: action.data,
    dataLoading: false
  });
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_DATA_START:
      return getDataStart(state, action);
    case actionType.PROFILE_DATA_START:
      return profileDataStart(state, action);
    case actionType.PROFILE_DATA_SUCCESS:
      return profileDataSuccess(state, action);
    case actionType.GET_DATA_SUCCESS:
      return getDataSuccess(state, action);
    case actionType.GET_DATA_FAIL:
      return getDataFail(state, action);
    case actionType.GET_DATA:
      return getUserData(state, action);
    case actionType.SET_IMAGE:
      return setImage(state, action);
    case actionType.GET_IMAGE_DATA_START:
      return getImageDataStart(state, action);
    case actionType.GET_IMAGE_DATA_SUCCESS:
      return getImage(state, action);
    case actionType.GET_RESTAURANTS_DATA:
      return getRestaurants(state, action);
    default:
      return state;
  }
};

export default dataReducer;

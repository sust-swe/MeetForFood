import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  data: [],
  image: {},
  resSetting: {},
  restaurants: [],
  restMenu: [],
  dataError: null,
  dataLoading: false,
  profileLoading: false,
  imageLoading: false,
  submitImageLoading: false,
  resSettingLoading: false
};

const restaurantProccessStart = (state, action) => {
  return updateObject(state, {
    dataError: null,
    resSettingLoading: true
  });
};

const restaurantProccessSuccess = (state, action) => {
  return updateObject(state, {
    dataError: null,
    resSettingLoading: false,
    resSetting: action.data.data
  });
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
    data: action.data.data,
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

const getUserData = (state, action) => {
  return updateObject(state, {
    data: action.data.data,
    dataLoading: false
  });
};

const setImageStart = (state, action) => {
  return updateObject(state, {
    submitImageLoading: true
  });
};

const setImageSuccess = (state, action) => {
  return updateObject(state, {
    image: action.image.data,
    submitImageLoading: false
  });
};

const getImageDataStart = (state, action) => {
  return updateObject(state, {
    imageLoading: true
  });
};

const getImageDataSuccess = (state, action) => {
  return updateObject(state, {
    image: action.image.data,
    imageLoading: false
  });
};

const getRestaurants = (state, action) => {
  return updateObject(state, {
    restaurants: action.data,
    dataLoading: false
  });
};

const getRestaurantsMenu = (state, action) => {
  return updateObject(state, {
    restMenu: action.data,
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
    case actionType.SET_IMAGE_START:
      return setImageStart(state, action);
    case actionType.SET_IMAGE_SUCCESS:
      return setImageSuccess(state, action);
    case actionType.GET_IMAGE_DATA_START:
      return getImageDataStart(state, action);
    case actionType.GET_IMAGE_DATA_SUCCESS:
      return getImageDataSuccess(state, action);
    case actionType.GET_RESTAURANTS_DATA:
      return getRestaurants(state, action);
    case actionType.GET_RESTAURANTS_MENU:
      return getRestaurantsMenu(state, action);
    case actionType.REST_SETTING_START:
      return restaurantProccessStart(state, action);
    case actionType.REST_SETTING_SUCCESS:
      return restaurantProccessSuccess(state, action);
    default:
      return state;
  }
};

export default dataReducer;

import axios from "axios";
import * as actionType from "./actionType";

export const setFilterStart = data => {
  return {
    type: actionType.SET_FILTER_START
  };
};

export const setFilterSuccess = data => {
  return {
    type: actionType.SET_FILTER_SUCCESS,
    filterInfo: { data }
  };
};

export const getFilterSuccess = data => {
  return {
    type: actionType.GET_FILTER_SUCCESS,
    suggestion: { data }
  };
};

export const getFilterSettingStart = () => {
  return {
    type: actionType.GET_FILTER_SETTING_START
  };
};

export const getFilterSetting = data => {
  return {
    type: actionType.GET_FILTER_SETTING,
    filterInfo: { data }
  };
};

export const filterStart = () => {
  return {
    type: actionType.GET_FILTER_START
  };
};

export const filterFail = error => {
  return {
    type: actionType.GET_FILTER_FAIL,
    dataError: error
  };
};

export const initFilter = (gender, min_age, max_age) => {
  return dispatch => {
    dispatch(filterStart());
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/profilesettings/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const userID = response.data[0].user_profile;
        const settingID = response.data[0].id;
        submitFilter(userID, settingID, gender, min_age, max_age, dispatch);
      });
  };
};

const submitFilter = (
  userID,
  settingID,
  gender,
  min_age,
  max_age,
  dispatch
) => {
  const token = localStorage.getItem("token");
  axios
    .put(
      `http://127.0.0.1:8000/api/profilesettings/${settingID}/`,
      {
        user_profile: userID,
        foodie_partner: gender,
        min_age: min_age,
        max_age: max_age
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      console.log(response.data);
      dispatch(setFilterSuccess(response.data));
    });
};

export const getFriendSuggestion = () => {
  return dispatch => {
    dispatch(filterStart());
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/explorerestaurantscard/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        dispatch(getFilterSuccess(response.data));
      })
      .catch(err => {
        dispatch(filterFail());
      });
  };
};

export const getRestaurantsSetting = () => {
  return dispatch => {
    dispatch(getFilterSettingStart());
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/explorerestaurants/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        dispatch(getFilterSetting(response.data[0]));
      });
  };
};

export const updateRestaurantChoice = (
  userId,
  id,
  resName,
  menu_choice,
  eating_time,
  filterId
) => {
  return dispatch => {
    dispatch(setFilterStart());
    const token = localStorage.getItem("token");
    console.log("accesing the function");
    console.log("filter: " + filterId);
    const formData = new FormData();
    formData.append("user_profile", userId);
    formData.append("user_about", id);
    formData.append("restaurant_name", resName);
    formData.append("menu_choice", menu_choice);
    formData.append("eating_time", eating_time);
    axios
      .put(
        `http://127.0.0.1:8000/api/explorerestaurants/${filterId}/`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        console.log(response.data);
        dispatch(setFilterSuccess(response.data));
      });
  };
};

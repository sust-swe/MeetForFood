import axios from "axios";
import * as actionType from "./actionType";

export const setFilterSuccess = () => {
  return {
    type: actionType.SET_FILTER_SUCCESS
  };
};

export const getFilterStart = () => {
  return {
    type: actionType.GET_FILTER_START
  };
};

export const getFilterFail = error => {
  return {
    type: actionType.GET_FILTER_FAIL,
    dataError: error
  };
};

export const initFilter = (gender, min_age, max_age) => {
  return dispatch => {
    dispatch(getFilterStart());
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
      dispatch(setFilterSuccess());
    });
};

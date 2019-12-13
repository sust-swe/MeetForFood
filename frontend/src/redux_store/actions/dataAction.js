import axios from "axios";
import * as actionType from "./actionType";

export const getDataSuccess = () => {
  return {
    type: actionType.GET_DATA_SUCCESS
  };
};

export const setImageAction = () => {
  return {
    type: actionType.SET_IMAGE
  };
};

export const getImageData = data => {
  return {
    type: actionType.GET_IMAGE_SUCCESS,
    data: { data }
  };
};

export const getDataStart = () => {
  return {
    type: actionType.GET_DATA_START
  };
};

export const getProfileDataStart = () => {
  return {
    type: actionType.GET_PROFILE_DATA_START
  };
};

export const getProfileDataSuccess = () => {
  return {
    type: actionType.GET_PROFILE_DATA_SUCCESS
  };
};

export const getDataFail = error => {
  return {
    type: actionType.GET_DATA_FAIL,
    dataError: error
  };
};

export const getData = data => {
  return {
    type: actionType.GET_DATA,
    data: { data }
  };
};

export const getRestaurantData = data => {
  return {
    type: actionType.GET_RESTAURANTS_DATA,
    data: data
  };
};

export const completeProfile = (
  phone_number,
  birth_date,
  gender,
  what_you_crave_for,
  userImage
) => {
  return dispatch => {
    dispatch(getDataStart());
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/profilesettings/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const settingID = response.data[0].id;
        const userID = response.data[0].user_profile;
        console.log("userId " + userID);
        setAbout(
          phone_number,
          birth_date,
          gender,
          what_you_crave_for,
          settingID,
          dispatch
        );
      });
  };
};

const setAbout = (
  phone_number,
  birth_date,
  gender,
  what_you_crave_for,
  settingId,
  dispatch
) => {
  const token = localStorage.getItem("token");
  axios
    .post(
      "http://127.0.0.1:8000/api/profileaboutitem/",
      {
        user_settings: settingId,
        phone_number: phone_number,
        birth_date: birth_date,
        gender: gender,
        what_you_crave_for: what_you_crave_for
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      if (response.data != null) {
        dispatch(getDataSuccess());
      }
    })
    .catch(err => {
      dispatch(getDataFail(err));
    });
};

export const setImage = userImage => {
  return dispatch => {
    dispatch(getDataStart());
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .get("http://127.0.0.1:8000/api/profilesettings/", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const userID = response.data[0].user_profile;
        console.log(userID);
        uploadImage(userImage, userID, token, dispatch);
      });
  };
};

export const getImage = () => {
  return dispatch => {
    dispatch(getDataStart());
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/profilesettings/", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const userID = response.data[0].user_profile;
        downloadImage(userID, token, dispatch);
      });
  };
};

const downloadImage = (userID, token, dispatch) => {
  axios
    .get("http://127.0.0.1:8000/api/image/", {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data);
      dispatch(getImageData(response.data[0]));
    });
};

const uploadImage = (userImage, userID, token, dispatch) => {
  const formData = new FormData();
  formData.append("user_profile", userID);
  formData.append("image", userImage, userImage.name);
  axios
    .post(`http://127.0.0.1:8000/api/image/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => {
      console.log(response.data);
      dispatch(setImageAction());
    })
    .catch(err => {
      console.log(err);
    });
};

export const getUser = () => {
  return dispatch => {
    dispatch(getProfileDataStart());
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/profileaboutitem/", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        dispatch(getData(response.data[0]));
        dispatch(getProfileDataSuccess());
      })
      .catch(err => {
        dispatch(getDataFail(err));
      });
  };
};

export const getRestaurants = () => {
  return dispatch => {
    dispatch(getDataStart());
    console.log("getting restaurants");
    axios
      .get("http://127.0.0.1:8000/restaurantapi/restaurant/")
      .then(response => {
        dispatch(getRestaurantData(response.data));
      })
      .catch(err => {
        dispatch(getDataFail(err));
      });
  };
};

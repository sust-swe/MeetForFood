import axios from "axios";
import * as actionType from "./actionType";

export const getDataSuccess = () => {
  return {
    type: actionType.GET_DATA_SUCCESS
  };
};

export const restProcessStart = () => {
  return {
    type: actionType.REST_SETTING_START
  };
};

export const restProcessSuccess = data => {
  return {
    type: actionType.REST_SETTING_SUCCESS,
    data: { data }
  };
};

export const setImageStart = () => {
  return {
    type: actionType.SET_IMAGE_START
  };
};

export const setImageSuccess = data => {
  return {
    type: actionType.SET_IMAGE_SUCCESS,
    image: { data }
  };
};

export const getImageDataStart = () => {
  return {
    type: actionType.GET_IMAGE_DATA_START
  };
};

export const getImageDataSuccess = data => {
  return {
    type: actionType.GET_IMAGE_DATA_SUCCESS,
    image: { data }
  };
};

export const getDataStart = () => {
  return {
    type: actionType.GET_DATA_START
  };
};

export const getProfileDataStart = () => {
  return {
    type: actionType.PROFILE_DATA_START
  };
};

export const getProfileDataSuccess = data => {
  return {
    type: actionType.PROFILE_DATA_SUCCESS,
    data: { data }
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

export const getRestaurantMenuSuccess = data => {
  return {
    type: actionType.GET_RESTAURANTS_MENU,
    data: data
  };
};

export const completeProfile = (
  phone_number,
  birth_date,
  gender,
  what_you_crave_for
) => {
  return dispatch => {
    dispatch(getProfileDataStart());
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
        console.log(response.data);
        dispatch(getProfileDataSuccess(response.data));
      }
    })
    .catch(err => {
      dispatch(getDataFail(err));
    });
};

export const setImage = (userImage, restaurantID) => {
  return dispatch => {
    dispatch(setImageStart());
    const token = localStorage.getItem("token");
    console.log(token);
    console.log("res ID: " + restaurantID);
    axios
      .get("http://127.0.0.1:8000/api/profileaboutitem/", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const userId = response.data[0];
        uploadImage(
          userImage,
          userId.user_id,
          userId.id,
          restaurantID,
          token,
          dispatch
        );
      });
  };
};

const uploadImage = (
  userImage,
  userID,
  aboutId,
  restaurantId,
  token,
  dispatch
) => {
  const formData = new FormData();
  formData.append("user_profile", userID);
  formData.append("user_about", aboutId);
  formData.append("restaurant_card", restaurantId);
  formData.append("image", userImage, userImage.name);
  console.log(userImage.name);
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
      dispatch(setImageSuccess(response.data));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getImage = () => {
  return dispatch => {
    dispatch(getImageDataStart());
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
      dispatch(getImageDataSuccess(response.data[0]));
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
        // console.log(response.data);
        dispatch(getProfileDataSuccess(response.data[0]));
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

export const getSearchedRestaurants = item => {
  return dispatch => {
    dispatch(getDataStart());
    console.log("getting restaurants");
    axios
      .get(`http://127.0.0.1:8000/restaurantapi/restaurant/?search=${item}`)
      .then(response => {
        dispatch(getRestaurantData(response.data));
      })
      .catch(err => {
        dispatch(getDataFail(err));
      });
  };
};

export const getRestaurantMenu = id => {
  return dispatch => {
    dispatch(getDataStart());
    axios
      .get(`http://127.0.0.1:8000/restaurantapi/restaurants/${id}/menu/`)
      .then(response => {
        console.log(response.data);
        dispatch(getRestaurantMenuSuccess(response.data));
      });
  };
};

export const updateProfile = (
  user_id,
  settingId,
  phone_number,
  birth_date,
  gender,
  favourite_food
) => {
  return dispatch => {
    dispatch(getProfileDataStart());
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://127.0.0.1:8000/api/profileaboutitem/${user_id}/`,
        {
          id: user_id,
          user_settings: settingId,
          phone_number: phone_number,
          birth_date: birth_date,
          gender: gender,
          what_you_crave_for: favourite_food
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        console.log(response.data);
        dispatch(getProfileDataSuccess(response.data));
      })
      .catch(err => {
        dispatch(getDataFail(err));
      });
  };
};

export const updateImage = (userProfile, userAbout, userImage) => {
  return dispatch => {
    dispatch(setImageStart());
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("user_profile", userProfile);
    formData.append("user_about", userAbout);
    formData.append("image", userImage, userImage.name);
    axios
      .put(`http://127.0.0.1:8000/api/image/${userAbout}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        dispatch(setImageSuccess(response.data));
      })
      .catch(err => {
        dispatch(getDataFail(err));
      });
  };
};

export const setRestaurantChoice = (userId, id, resName) => {
  return dispatch => {
    dispatch(restProcessStart());
    const token = localStorage.getItem("token");
    console.log("accesing the function");
    const formData = new FormData();
    formData.append("user_profile", userId);
    formData.append("user_about", id);
    formData.append("restaurant_name", resName);
    formData.append("menu_choice", "");
    formData.append("eating_time", "");
    axios
      .post("http://127.0.0.1:8000/api/explorerestaurants/", formData, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        dispatch(restProcessSuccess(response.data));
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
    dispatch(restProcessStart());
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
        dispatch(restProcessSuccess(response.data));
      });
  };
};

export const getRestaurantChoice = () => {
  return dispatch => {
    dispatch(restProcessStart());
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/explorerestaurants/", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data[0]);
        dispatch(restProcessSuccess(response.data[0]));
      });
  };
};

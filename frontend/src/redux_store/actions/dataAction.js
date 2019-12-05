import axios from "axios";
import * as actionType from "./actionType";

export const getDataSuccess = () => {
  return {
    type: actionType.GET_DATA_SUCCESS
  };
};

export const getDataStart = () => {
  return {
    type: actionType.GET_DATA_START
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
        setAbout(
          phone_number,
          birth_date,
          gender,
          what_you_crave_for,
          userImage,
          userID,
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
  userImage,
  userID,
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
        setImage(userID, userImage, token);
        dispatch(getDataSuccess());
      }
      console.log(response.data);
    })
    .catch(err => {
      dispatch(getDataFail(err));
    });
};

const setImage = (userID, userImage, token) => {
  let image = new FormData();
  image.append("image", userImage);
  axios
    .post(
      "http://127.0.0.1:8000/api/image/",
      {
        user_profile: userID,
        image: image
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    )
    .then(response => {
      console.log("image uploaded");
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getUser = () => {
  return dispatch => {
    dispatch(getDataStart());
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/profileaboutitem/", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        dispatch(getData(response.data[0]));
      })
      .catch(err => {
        dispatch(getDataFail(err));
      });
  };
};

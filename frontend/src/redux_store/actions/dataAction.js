import axios from "axios";
import * as actionType from "./actionType";

export const authStart = () => {
  return {
    type: actionType.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionType.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionType.AUTH_FAIL,
    error: error
  };
};

export const completeProfile = (
  phone_number,
  birth_date,
  gender,
  what_you_crave_for
) => {
  return dispatch => {
    dispatch(authStart());
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://127.0.0.1:8000/api/profileaboutitem/",
        {
          phone_number: phone_number,
          birth_date: birth_date,
          gender: gender,
          what_you_crave_for: what_you_crave_for
        },
        {
          headers: {
            authorization: `token ${token}`
          }
        }
      )
      .then(response => {
        if (response.data != null) {
          dispatch(authSuccess(token));
        }
        console.log(response.data);
      })
      .catch(err => {
        dispatch(authFail(err));
      });
    console.log(token);
  };
};

export const getUser = () => {
  return dispatch => {
    dispatch(authStart());
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/profileaboutitem/", {
        headers: {
          authorization: `token ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

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

export const getUser = () => {
  return dispatch => {
    dispatch(authStart());
    axios
      .get("http://127.0.0.1:8000/api/profileaboutitem/")
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

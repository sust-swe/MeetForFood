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

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionType.AUTH_LOGOUT
  };
};

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/api/login/", {
        username: email,
        password: password
      })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckstate = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
    }
  };
};

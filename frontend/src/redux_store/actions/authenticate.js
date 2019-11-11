import axios from "axios";
import * as actionType from "./actionType";

const existed = "user profile with this email already exists.";

const login = (email, password, dispatch) => {
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
    login(email, password, dispatch);
  };
};

export const authSignUp = (fullName, email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/api/profile/", {
        name: fullName,
        email: email,
        password: password
      })
      .then(response => {
        if (response === existed) {
          dispatch(authFail(existed));
        } else {
          login(email, password, dispatch);
        }
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckstate = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === null || token === undefined) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
    }
  };
};

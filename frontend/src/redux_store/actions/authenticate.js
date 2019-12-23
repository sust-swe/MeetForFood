import axios from "axios";
import * as actionType from "./actionType";

const existed = "user profile with this email already exists.";

const login = (email, password, dispatch, id) => {
  dispatch(authStart());
  axios
    .post("http://127.0.0.1:8000/api/token/", {
      email: email,
      password: password
    })
    .then(response => {
      const authToken = response.data.access;
      const streamToken = response.data;
      console.log("analyze token" + streamToken);
      localStorage.setItem("stream", response.data.stream);
      localStorage.setItem("token", authToken);
      setDefaultFilter(id, authToken);
      dispatch(authSuccess(authToken));
    })
    .catch(err => {
      dispatch(authFail(err));
    });
};

const setDefaultFilter = (id, token) => {
  axios
    .post(
      "http://127.0.0.1:8000/api/profilesettings/",
      {
        user_profile: id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      console.log(response.data);
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
  localStorage.removeItem("stream");
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
          const id = response.data.id;
          console.log(
            "email: " + email + "password: " + password + "id: " + id
          );
          login(email, password, dispatch, id);
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

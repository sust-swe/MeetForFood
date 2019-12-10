import axios from "axios";
import * as actionType from "./actionType";

export const getListStart = () => {
  return {
    type: actionType.GET_LIST
  };
};

export const requestStart = () => {
  return {
    type: actionType.REQUEST_START
  };
};

export const requestSuccess = () => {
  return {
    type: actionType.REQUEST_SUCCESS
  };
};

export const requestFail = error => {
  return {
    type: actionType.REQUEST_FAIL,
    error: error
  };
};

export const getListSuccess = data => {
  return {
    type: actionType.GET_LIST_SUCCESS,
    friendList: data
  };
};

export const getListFail = error => {
  return {
    type: actionType.GET_LIST_FAIL,
    dataError: error
  };
};

export const getRequestListSuccess = data => {
  return {
    type: actionType.GET_REQUEST_LIST_SUCCESS,
    requestList: data
  };
};

export const getFriendRequests = () => {
  return dispatch => {
    dispatch(getListStart());
    const token = localStorage.getItem("token");
    console.log("accesing friend reqest");
    axios
      .get("http://127.0.0.1:8000/api/friends/requests/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        dispatch(getRequestListSuccess(response.data));
      })
      .catch(err => {
        dispatch(getListFail(err));
      });
  };
};

export const acceptRequest = requestID => {
  return dispatch => {
    dispatch(requestStart());
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .post(
        `http://127.0.0.1:8000/api/friendrequests/${requestID}/accept/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        console.log(response.data);
        dispatch(requestSuccess());
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

export const rejectRequest = requestID => {
  return dispatch => {
    dispatch(requestStart());
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://127.0.0.1:8000/api/friendrequests/${requestID}/reject/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        console.log(response.data);
        dispatch(requestSuccess());
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

export const sendRequest = requestID => {
  return dispatch => {
    dispatch(requestStart());
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://127.0.0.1:8000/api/friends/",
        {
          email: requestID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        console.log(response.data);
        dispatch(requestSuccess());
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

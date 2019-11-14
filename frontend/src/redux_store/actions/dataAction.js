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
  what_you_crave_for
) => {
  return dispatch => {
    dispatch(getDataStart());
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
          dispatch(getDataSuccess());
        }
        console.log(response.data);
      })
      .catch(err => {
        dispatch(getDataFail(err));
      });
    console.log(token);
  };
};

export const getUser = () => {
  return dispatch => {
    dispatch(getDataStart());
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/profileaboutitem/", {
        headers: {
          authorization: `token ${token}`
        }
      })
      .then(response => response.data)
      .then(data => {
        dispatch(getData(data));
        dispatch(getDataSuccess());
      })
      .catch(err => {
        dispatch(getDataFail(err));
      });
  };
};

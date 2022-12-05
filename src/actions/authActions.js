import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { removeModel } from "./modelAction";
import jwt_decode from "jwt-decode";
import { setBt, setBt1 } from "./modelAction";
import { megreUser, megreArray } from "./EventActions";
import { getUserEvents } from "./actions";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  SUCCESS_REGISTER,
  CLEAR_ERRORS,
  ACTIVE_CLASS,
  GET_ERROR,
  GET_ERRORSADH,
  GET_ALL_USERS,
  ER_GET_ALL_USERS,
  ERROR_GET_ALL_ADEHRENT,
  GET_Adherent,
  CLEAR_ERRORS_ADH,
  GET_ALL_ADEHRENT,
  GET_USER,
  EDIT_ADEHERENT,
  EDIT_USER,
  ERR_EDIT_USER,
  CLEAR_ERROR_USER,
} from "./types";
// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/sign-in")) // re-direct to login on successful register

    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Login - get user token
export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(getAdhrent());
    })

    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Set logged in user
export const setCurrentUser = (decoded) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });
  dispatch(getAdhrent());
  dispatch(getUserEvents());
  dispatch(getUser());
  dispatch(getAllUsers());
  dispatch(getAllAdherent());
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};
// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.reload(false);
  dispatch(getAdhrent({}));
};
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
export const clearErrorsAdh = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_ADH,
  });
};
export const activeClass = (active) => (dispatch) => {
  dispatch({
    type: ACTIVE_CLASS,
    payload: active,
  });
};

export const getAdhrent = (user) => (dispatch) => {
  axios
    .get("/api/adherent")
    .then((res) =>
      dispatch({
        type: GET_Adherent,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_ERROR,
      });
    });
};

export const registerAdherent = (data, history) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  axios
    .post("/api/adherent", data, config)
    .then((res) => {
      dispatch({
        type: SUCCESS_REGISTER,
        payload: res.data.adherent,
      });
      dispatch(removeModel());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORSADH,
        payload: err.response.data,
      })
    );
};

export const editeAdherent = (updatedAdherent) => (dispatch) => {
  axios
    .put(`/api/adherent/${updatedAdherent._id}`, updatedAdherent)
    .then((res) => {
      dispatch({
        type: EDIT_ADEHERENT,
        payload: updatedAdherent,
      });

      dispatch(setBt1(false));
      dispatch(getAllAdherent());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORSADH,
        payload: err.response.data,
      })
    );
};

export const editeUser = (updateUser) => (dispatch) => {
  axios
    .put(`/api/users/${updateUser._id}`, updateUser)
    .then((res) => {
      dispatch({
        type: EDIT_USER,
        payload: updateUser,
      });
      dispatch(setBt(false));
      dispatch(getAllUsers());
    })
    .catch((err) => {
      dispatch({
        type: ERR_EDIT_USER,
        payload: err.response.data,
      });
    });
};
export const getUser = () => (dispatch) => {
  axios
    .get("/api/users")
    .then((res) =>
      dispatch({
        type: GET_USER,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_ERROR,
      });
    });
};

export const clearErrorUSer = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR_USER,
  });
};

export const getAllAdherent = () => (dispatch) => {
  axios
    .get("/api/adherent/all")
    .then((res) => {
      dispatch({
        type: GET_ALL_ADEHRENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_GET_ALL_ADEHRENT,
      });
    });
};

export const getAllUsers = () => (dispatch) => {
  axios
    .get("/api/users/all")
    .then((res) => {
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data,
      });
      dispatch(megreUser());
      dispatch(megreArray());
    })
    .catch((err) => {
      dispatch({
        type: ER_GET_ALL_USERS,
      });
    });
};

import {
  GET_ALL_EVENTS,
  ERROR_GET_ALL_EVENTS,
  MERGRE_TABLE,
  MERGRE_USER,
} from "./types";
import axios from "axios";
export const getAllEvents = () => (dispatch) => {
  axios
    .get("/api/event/all")
    .then((res) => {
      dispatch({
        type: GET_ALL_EVENTS,
        payload: res.data,
      });
      dispatch(megreArray());
      dispatch(megreUser());
    })
    .catch((err) => {
      dispatch({
        type: ERROR_GET_ALL_EVENTS,
      });
    });
};

export const megreArray = () => (dispatch) => {
  dispatch({
    type: MERGRE_TABLE,
  });
};
export const megreUser = () => (dispatch) => {
  dispatch({
    type: MERGRE_USER,
  });
};

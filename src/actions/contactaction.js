import {
  ADD_CONTACT,
  CONTACT_ERROR,
  GET_CONTACT,
  DELETE_CONTACT,
} from "./types";
import axios from "axios";
export const getContact = () => (dispatch) => {
  axios.get("/api/contact").then((res) =>
    dispatch({
      type: GET_CONTACT,
      payload: res.data,
    })
  );
};
export const addcontact = (newcontact) => (dispatch) => {
  axios
    .post("/api/contact/add", newcontact)
    .then((res) =>
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: CONTACT_ERROR,
        payload: err.reponse.msg,
      })
    );
};
export const deletecontact = (id) => (dispatch) => {
  axios
    .delete(`/api/contact/${id}`)
    .then(() =>
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: CONTACT_ERROR,
        payload: err.reponse.msg,
      })
    );
};

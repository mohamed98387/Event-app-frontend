import {
  GET_EVENTS,
  ERROR_GET_ALL_EVENTS,
  GET_EVENT_BY_Id,
  SUCESS_ADD_EVENT,
  ERROR_ADD_EVENT,
  CLEAR_ERROR_EVENT,
  GET_EVENTS_USER,
  ERR_GET_EVENTS,
  EDIT_EVENT,
  DELETE_EVENT,
  NOTIFICATION,
  SAVE_EVENT,
} from "./types";
import { getAllUsers, getAllAdherent, editeAdherent } from "./authActions";
import { getAllEvents } from "./EventActions";
import { modelEdit } from "./modelAction";
import axios from "axios";

export const getEvents = () => (dispatch) => {
  axios
    .get("/api/event/all")
    .then((res) => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data,
      });
      dispatch(getAllAdherent());
      dispatch(getAllEvents());
      dispatch(getAllUsers());
    })
    .catch((err) => {
      dispatch({
        type: ERROR_GET_ALL_EVENTS,
      });
    });
};
export const getEventById = (id) => (dispatch) => {
  axios
    .get(`/api/event/singleEvent/${id}`)
    .then((res) => {
      dispatch({
        type: GET_EVENT_BY_Id,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addEvent = (infos) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  axios
    .post("/api/event", infos, config)
    .then((res) => {
      dispatch({
        type: SUCESS_ADD_EVENT,
        payload: res.data,
      });
      dispatch(editeAdherent(infos.user));
      dispatch(notification(infos));
    })
    .catch((err) =>
      dispatch({
        type: ERROR_ADD_EVENT,
        payload: err.response.data,
      })
    );
};
export const getUserEvents = () => (dispatch) => {
  axios
    .get("/api/event")
    .then((res) => {
      dispatch({
        type: GET_EVENTS_USER,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: ERR_GET_EVENTS,
        payload: err.response.data,
      })
    );
};

export const clearErrorEvent = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR_EVENT,
  });
};
export const editEvent = (updatedEvent) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  axios
    .put(`/api/event/${updatedEvent._id}`, updatedEvent, config)
    .then((res) => {
      dispatch({
        type: EDIT_EVENT,
        payload: updatedEvent,
      });
      dispatch(modelEdit(false));
    })
    .catch((err) =>
      dispatch({
        type: ERROR_ADD_EVENT,
        payload: err.response.data,
      })
    );
};
export const deleteEvent = (id) => (dispatch) => {
  axios
    .delete(`/api/event/${id}`)
    .then(() => {
      dispatch({ type: DELETE_EVENT, payload: id });
    })
    .catch((err) =>
      dispatch({
        type: ERROR_ADD_EVENT,
        payload: err.response.data,
      })
    );
};
export const saveEvent = (event) => (dispatch) => {
  dispatch({
    type: SAVE_EVENT,
    payload: event,
  });
};
export const notification = (notification) => (dispatch) => {
  console.log(notification);
  let variable = {
    to: "admin",
    Titre: notification.Titre,
    text: notification.text,
  };
  axios.post(`/api/notification/saveNotification`, variable).then((res) => {
    dispatch({
      type: NOTIFICATION,
    });
  });
};

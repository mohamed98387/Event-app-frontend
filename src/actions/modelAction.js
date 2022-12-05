import {
  SET_MODEL,
  REMOVE_MODEL,
  SET_BT,
  SET_SIDEBAR,
  SET_BT1,
  MODEL_EDIT,
} from "./types";

export const setModel = () => (dispatch) => {
  dispatch({
    type: SET_MODEL,
  });
};
export const removeModel = () => (dispatch) => {
  dispatch({
    type: REMOVE_MODEL,
  });
};

export const setSideBar = (etat) => (dispatch) => {
  dispatch({
    type: SET_SIDEBAR,
    payload: etat,
  });
};

export const setBt = (state) => (dispatch) => {
  dispatch({
    type: SET_BT,
    payload: state,
  });
};
export const setBt1 = (state) => (dispatch) => {
  dispatch({
    type: SET_BT1,
    payload: state,
  });
};
export const modelEdit = (state) => (dispatch) => {
  dispatch({
    type: MODEL_EDIT,
    payload: state,
  });
};

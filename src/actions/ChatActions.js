import { ADD_MESSAGES } from "./types";
import axios from "axios";
export const addMessage = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  axios
    .post("/api/chat", data, config)
    .then((res) => {
      dispatch({
        type: ADD_MESSAGES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: ADD_MESSAGES,
        payload: err.response.data,
      })
    );
};

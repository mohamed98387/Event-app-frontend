import { ADD_MESSAGES } from "../actions/types";

const initstate = {
  message: {},
};

const chatReducer = (state = initstate, action) => {
  switch (action.type) {
    case ADD_MESSAGES:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default chatReducer;

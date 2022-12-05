import {
  ADD_CONTACT,
  CONTACT_ERROR,
  GET_CONTACT,
  DELETE_CONTACT,
} from "../actions/types";

const initstate = {
  contact: [],
  err: [],
  get: [],
};

const contactReducer = (state = initstate, action) => {
  switch (action.type) {
    case GET_CONTACT:
      return {
        ...state,
        get: action.payload,
      };

    case ADD_CONTACT:
      return {
        ...state,
        contact: state.contact.concat(action.payload),
      };

    case CONTACT_ERROR:
      return {
        ...state,
        err: action.payload,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        get: state.get.filter((el) => el._id !== action.payload),
      };
    default:
      return state;
  }
};

export default contactReducer;

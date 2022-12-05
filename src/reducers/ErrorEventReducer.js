import { ERROR_ADD_EVENT, CLEAR_ERROR_EVENT } from "../actions/types";
let initState = {
  errors: [],
};

const ErrorEventReeducer = (state = initState, action) => {
  switch (action.type) {
    case ERROR_ADD_EVENT:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERROR_EVENT:
      return {
        ...state,
        errors: [],
      };

    default:
      return state;
  }
};
export default ErrorEventReeducer;

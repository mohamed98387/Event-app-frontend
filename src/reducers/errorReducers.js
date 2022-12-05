import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ERRORSADH,
  CLEAR_ERRORS_ADH,
  ERR_EDIT_USER,
  CLEAR_ERROR_USER,
} from "../actions/types";
const initialState = {
  errorSign: {},
  adhErrors: [],
  errorUpdate: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errorSign: action.payload,
      };
    case GET_ERRORSADH:
      return {
        ...state,
        adhErrors: action.payload,
      };
    case CLEAR_ERRORS_ADH:
      return {
        ...state,
        adhErrors: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errorSign: {},
      };
    case ERR_EDIT_USER:
      return {
        ...state,
        errorUpdate: action.payload,
      };
    case CLEAR_ERROR_USER:
      return {
        ...state,
        errorUpdate: [],
      };

    default:
      return state;
  }
}

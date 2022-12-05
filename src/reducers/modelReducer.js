import {
  SET_MODEL,
  REMOVE_MODEL,
  SET_SIDEBAR,
  SET_BT,
  SET_BT1,
  MODEL_EDIT,
} from "../actions/types";
const modelReducer = (
  state = {
    model: false,
    side: false,
    button1: false,
    button2: false,
    modelEdit: false,
  },
  action
) => {
  switch (action.type) {
    case SET_MODEL:
      return {
        ...state,
        model: true,
      };
    case REMOVE_MODEL:
      return {
        ...state,
        model: false,
      };

    case SET_SIDEBAR:
      return {
        ...state,
        side: action.payload,
      };
    case SET_BT:
      return {
        ...state,
        button1: action.payload,
      };
    case SET_BT1:
      return {
        ...state,
        button2: action.payload,
      };
    case MODEL_EDIT:
      return {
        ...state,
        modelEdit: action.payload,
      };

    default:
      return state;
  }
};
export default modelReducer;

import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import classReducer from "./classReducer";
import modelReducer from "./modelReducer";
import EventReducer from "./EventReducer";
import chatReducer from "./ChatReducer";
import Reducer1 from "./Reducer1";
import ErrorEventReeducer from "./ErrorEventReducer";
import contactReducer from "./ContactReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  classReducer,
  modelReducer,
  Reducer1,
  EventReducer,
  chatReducer,
  contactReducer,
  ErrorEventReeducer,
});

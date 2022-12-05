import {
  SET_CURRENT_USER,
  SUCCESS_REGISTER,
  GET_Adherent,
  EDIT_ADEHERENT,
  EDIT_USER,
  GET_USER,
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  adherent: {},
  registred: false,
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: { ...action.payload.user },
        currentUser: {
          ...action.payload.user,
        },
      };

    case GET_Adherent:
      return {
        ...state,
        adherent: action.payload,
        registred: !isEmpty(action.payload),
      };
    case EDIT_ADEHERENT:
      return {
        ...state,
        adherent: { ...state.adherent, ...action.payload },
        loading: true,
      };
    case SUCCESS_REGISTER:
      return {
        ...state,
        adherent: { ...action.payload },
        registred: !isEmpty(action.payload),
      };
    case EDIT_USER: {
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
        loading: true,
      };
    }
    case GET_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }

    default:
      return state;
  }
}

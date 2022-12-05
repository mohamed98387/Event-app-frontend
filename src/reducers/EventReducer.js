import {
  GET_ALL_EVENTS,
  GET_ALL_ADEHRENT,
  ERROR_GET_ALL_EVENTS,
  MERGRE_TABLE,
  MERGRE_USER,
  GET_ALL_USERS,
} from "../actions/types";
const initialState = {
  Events: [],
  Error: [],
  allUsers: [],
  allAdherents: [],
  megreTable: [],
  isLoading: false,
};
const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        Events: action.payload,
      };

    case ERROR_GET_ALL_EVENTS:
      return {
        ...state,
        Error: state.Error.concat(action.payload),
      };

    case GET_ALL_ADEHRENT: {
      return {
        ...state,
        allAdherents: action.payload,
      };
    }
    case MERGRE_TABLE: {
      return {
        ...state,
        megreTable: state.Events.map((e) => {
          for (let element of state.allAdherents) {
            if (e.User === element.User) Object.assign(e, element);
          }
          return e;
        }),
      };
    }
    case GET_ALL_USERS: {
      return {
        ...state,
        allUsers: action.payload,
      };
    }
    case MERGRE_USER:
      return {
        ...state,
        Events: state.Events.map((e) => {
          for (let element of state.allUsers) {
            if (e.User === element._id) Object.assign(e, element);
          }
          return e;
        }),
        isLoading: true,
      };

    default:
      return state;
  }
};
export default EventReducer;

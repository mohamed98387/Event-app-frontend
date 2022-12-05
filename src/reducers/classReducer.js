import { ACTIVE_CLASS } from "../actions/types";
const classReducer = (
  state = {
    acceuil: true,
    apropos: false,
    evnet: false,
    organisature: false,
  },

  action
) => {
  switch (action.type) {
    case ACTIVE_CLASS:
      return action.payload;
    default:
      return state;
  }
};

export default classReducer;

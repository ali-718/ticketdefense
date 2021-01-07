const initialState = {
  user: {},
  ticket: {},
  // user: { id: 1 },
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case "SET_LAWYER":
      return {
        ...state,
        ticket: { ...state.ticket, lawyer: payload },
      };
    case "SET_LICENSE_POINTS":
      return {
        ...state,
        ticket: { ...state.ticket, points: payload },
      };
    case "SET_VIOLATION_TYPE":
      return {
        ...state,
        ticket: { ...state.ticket, violationType: payload },
      };
    case "SET_STATE":
      return {
        ...state,
        ticket: { ...state.ticket, state: payload },
      };
    case "USER":
      return {
        ...state,
        user: payload,
      };
    case "SET_IMAGE":
      return {
        ...state,
        user: payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
}

const initialState = {
  user: {},
  // user: { id: 1 },
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case "USER":
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
}

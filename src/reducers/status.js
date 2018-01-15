const INITIAL_STATE = {
  routesLoaded: false,
  departuresLoaded: {}
};

export default function status(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

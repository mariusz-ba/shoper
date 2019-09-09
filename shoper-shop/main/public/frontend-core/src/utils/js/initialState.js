function getInitialState() {
  if (!window.__INITIAL_STATE__) {
    throw new Error(
      `Property "__INITIAL_STATE__" does not exist on "window" object.`
    );
  }

  return window.__INITIAL_STATE__;
}

export const initialState = getInitialState();

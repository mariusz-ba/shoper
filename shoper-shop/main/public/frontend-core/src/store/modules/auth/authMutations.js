export const AuthMutationsTypes = {
  SIGN_IN_START: 'SIGN_IN_START',
  SIGN_IN_END: 'SIGN_IN_END',
  SET_USER_DATA: 'SET_USER_DATA',
  CLEAR_STATE: 'CLEAR_STATE'
};

export const AuthMutations = {
  [AuthMutationsTypes.SIGN_IN_START](state) {
    state.isFetching = true;
  },
  [AuthMutationsTypes.SET_USER_DATA](state, data) {
    state.isAuthenticated = data.loggedIn;
    state.isFetching = false;
    state.user = data.user;
  },
  [AuthMutationsTypes.CLEAR_STATE](state) {
    state.isAuthenticated = false;
    state.isFetching = false;
    state.user = null;
  },
  [AuthMutationsTypes.SIGN_IN_END](state) {
    state.isFetching = false;
  }
};

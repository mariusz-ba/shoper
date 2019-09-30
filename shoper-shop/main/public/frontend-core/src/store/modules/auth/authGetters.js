export const AuthGetters = {
  userId(state) {
    return state.user ? state.user.id : undefined;
  }
};

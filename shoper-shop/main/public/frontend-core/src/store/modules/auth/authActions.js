import { AuthMutationsTypes } from './authMutations';
import authService from '../../../services/authService';

export const AuthActionsTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT'
};

export const AuthActions = {
  [AuthActionsTypes.SIGN_IN]({ commit }, credentials) {
    commit(AuthMutationsTypes.SIGN_IN_START);

    return authService()
      .signIn(credentials)
      .then(data => {
        commit(AuthMutationsTypes.SET_USER_DATA, data);
      })
      .catch(err => {
        commit(AuthMutationsTypes.SIGN_IN_END);
        throw err;
      });
  },
  [AuthActionsTypes.SIGN_UP]({ commit }, userData) {
    commit(AuthMutationsTypes.SIGN_IN_START);

    return authService()
      .signUp(userData)
      .then(data => {
        commit(AuthMutationsTypes.SET_USER_DATA, data);
      })
      .catch(err => {
        commit(AuthMutationsTypes.SIGN_IN_END);
        throw err;
      });
  },
  [AuthActionsTypes.SIGN_OUT]({ commit }) {
    commit(AuthMutationsTypes.SIGN_IN_START);

    return authService()
      .signOut()
      .then(() => {
        commit(AuthMutationsTypes.CLEAR_STATE);
      })
      .catch(err => {
        commit(AuthMutationsTypes.SIGN_IN_END);
        throw err;
      });
  }
};

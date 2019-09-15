import { AuthState } from './authState';
import { AuthMutations } from './authMutations';
import { AuthActions } from './authActions';

export const AuthModule = {
  namespaced: true,
  state: AuthState,
  mutations: AuthMutations,
  actions: AuthActions
};

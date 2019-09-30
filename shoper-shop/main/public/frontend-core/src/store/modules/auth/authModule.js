import { AuthState } from './authState';
import { AuthMutations } from './authMutations';
import { AuthActions } from './authActions';
import { AuthGetters } from './authGetters';

export const AuthModule = {
  namespaced: true,
  state: AuthState,
  mutations: AuthMutations,
  actions: AuthActions,
  getters: AuthGetters
};

import { initialState } from '../../../utils/js/initialState';

export const AuthState = {
  isAuthenticated: initialState.sessionInformation ? initialState.sessionInformation.loggedIn : false,
  isFetching: false,
  user: initialState.sessionInformation ? initialState.sessionInformation.user : null
};

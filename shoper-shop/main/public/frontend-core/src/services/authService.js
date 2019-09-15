import axios from 'axios';

let service;

class AuthService {
  signIn(credentials) {
    return axios.post('/api/auth/signin', credentials)
      .then(res => res.data);
  }

  signUp(userData) {
    return axios.post('/api/auth/signup', userData)
      .then(res => res.data);
  }

  signOut() {
    return axios.post('/api/auth/signout')
      .then(res => res.data);
  }
}

function authService() {
  if (!service) {
    service = new AuthService();
  }

  return service;
}

export default authService;

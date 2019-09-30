import axios from 'axios';

let service;

class AccountService {
  getUserAddresses(userId) {
    return axios.get(`/api/users/${userId}/address`)
      .then(res => res.data);
  }
}

function accountService() {
  if (!service) {
    service = new AccountService();
  }

  return service;
}

export default accountService;

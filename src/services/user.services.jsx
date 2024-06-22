import axiosInstance from '../axios/config';

class UserService {
  createUser(userData) {
    return axiosInstance.post('/users/register', userData);
  }
  login(userData) {
    return axiosInstance.post('/users/login', userData);
  }
}

export default new UserService();

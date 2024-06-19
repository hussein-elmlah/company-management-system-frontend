import axiosInstance from '../axios/config';

class UserService {
  createUser(userData) {
    return axiosInstance.post('/api/users', userData);
  }
}

export default new UserService();

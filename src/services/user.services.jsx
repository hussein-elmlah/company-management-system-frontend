import axiosInstance from '../axios/config';

class UserService {
  createUser(userData) {
    return axiosInstance.post('/users/register', userData);
  }
  login(userData) {
    return axiosInstance.post('/users/login', userData);
  }

  requestPasswordReset(email) {
    return axiosInstance.post(`/users/forgot-password`, { email });
  }
  
  resetPassword (token, newPassword) {
    return axiosInstance.post(`/users/reset-password`, { token, newPassword });
  }
  verifyEmail(token) {
    return axiosInstance.get(`/users/verify-email?token=${token}`);
  }
}

export default new UserService();

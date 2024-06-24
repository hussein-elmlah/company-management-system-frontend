import axiosInstance from "./config";

export const createUser = function (userData) {
  return axiosInstance.post("/users/register", userData);
};

export const login = function (userData) {
  return axiosInstance.post("/users/login", userData);
};

export const requestPasswordReset = function (email) {
  return axiosInstance.post(`/users/forgot-password`, { email });
};

export const resetPassword = function (token, newPassword) {
  return axiosInstance.post(`/users/reset-password`, { token, newPassword });
};
export const verifyEmail = function (token) {
  return axiosInstance.get(`/users/verify-email?token=${token}`);
};

export const getUserData = async function () {
  const response = await axiosInstance.get("/users");
  return response.data;
};

const UserService = {
  createUser,
  login,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
  getUserData,
};

export default UserService;

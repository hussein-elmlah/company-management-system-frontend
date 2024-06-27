import axiosInstance from "./config";

export const createEmpUser = function (userData) {
  userData.type = "employee";
  console.log(userData);
  return axiosInstance.post("/users/register", userData);
};

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

export const updateUser = async function (userId, updatedFields) {
  const response = await axiosInstance.put(`/users/${userId}`, updatedFields);
  return response.data;
};

export const getDepartments = async function () {
  const response = await axiosInstance.get("/departments");
  return response.data;
};
export const getUserById = async function (id) {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const getUsersOfDepartment = async function (dept_id) {
  const response = await axiosInstance.get(`/users/department/${dept_id}`);
  return response.data;
};

export const updateProjectEmployees = async function (proj_id, data) {
  const response = await axiosInstance.put(`/projects/${proj_id}/employees`, data);
  return response.data;
};

const UserService = {
  createUser,
  createEmpUser,
  login,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
  getUserData,
  updateUser,
  getDepartments,
  getUserById,
  getUsersOfDepartment,
  updateProjectEmployees
};

export default UserService;

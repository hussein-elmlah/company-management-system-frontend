import axiosInstance from "./config";

export const createDepartment = function (departmentData) {
  return axiosInstance.post("/departments", departmentData);
};

export const getAllDepartments = async function (departmentData) {
  const response = await axiosInstance.get("/departments", departmentData);
  const departments = response.data.data;
  // console.log('departments', departments);
  return departments;
};

const departmentService = {
    createDepartment,   
    getAllDepartments,
};

export default departmentService;

import axiosInstance from "./config";

export const getProjectById = async function (id) {
  const response = await axiosInstance.get(`/projects/${id}`);
  return response.data;
};

const ProjectService = {
  getProjectById ,
};

export default ProjectService;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (page) => {
    try {
      const response = await axiosInstance.get(`/projects?page=${page}`);
      const data= await response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }
);


export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData) => {
    try {
      const response = await axiosInstance.post("/projects", projectData);
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, updatedFields }) => {
    try {
      const response = await axiosInstance.put(`/projects/${projectId}`, updatedFields);
      return response.data;
    } catch (error) {
      console.error(`Error updating project with ID ${projectId}:`, error);
      throw error;
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId) => {
    try {
      await axiosInstance.delete(`/projects/${projectId}`);
      return projectId;
    } catch (error) {
      console.error(`Error deleting project with ID ${projectId}:`, error);
      throw error;
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (projectId) => {
    try {
      const response = await axiosInstance.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project with ID ${projectId}:`, error);
      throw error;
    }
  }
);



  
const initialState = {
  projectList: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  projectsPerPage: 10,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.projectList = action.payload.data; // Assuming action.payload.data is the array of projects
        state.totalPages = Math.ceil(action.payload.totalCount / state.projectsPerPage);
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Assuming action.error.message contains the error message
      });
  },
});

export const { setCurrentPage } = projectSlice.actions;

export default projectSlice.reducer;
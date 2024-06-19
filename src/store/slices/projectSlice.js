import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (page) => {
    try {
      const response = await axiosInstance.get(`/projects?page=${page}`);
      return response.data;
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
    reducers:{
      setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProjects.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchProjects.fulfilled, (state, action) => {
          state.isLoading = false;
          state.projectList = action.payload;
        })
        .addCase(fetchProjects.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(createProject.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createProject.fulfilled, (state, action) => {
          state.isLoading = false;
          state.projectList.push(action.payload); 
        })
        .addCase(createProject.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(updateProject.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateProject.fulfilled, (state, action) => {
          state.isLoading = false;
          // Update the project in the list if needed
          state.projectList = state.projectList.map(project =>
            project._id === action.payload._id ? action.payload : project
          );
        })
        .addCase(updateProject.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(deleteProject.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteProject.fulfilled, (state, action) => {
          state.isLoading = false;
          state.projectList = state.projectList.filter(project =>
            project._id !== action.payload
          );
        })
        .addCase(deleteProject.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    },
  });
  
  
   export const { setCurrentPage } = projectSlice.actions;
export default projectSlice.reducer;

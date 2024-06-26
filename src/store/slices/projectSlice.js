import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (page,thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await axiosInstance.get(`/projects?page=${page}`);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (error) {
      // console.error("Error fetching projects:", error);
      // throw error;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProjectsWithParams = createAsyncThunk(
  "projects/fetchProjectsWithParams",
  async (params) => {
    const { page = 1, limit = 10, ...rest } = params;
    try {
      const response = await axiosInstance.get('/projects', {
        params: { page, limit, ...rest }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching paginated projects:', error);
      throw error;
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData,thunkAPI) => {
    const {rejectWithValue} = thunkAPI;

    try {
      const response = await axiosInstance.post("/projects", projectData);
      return response.data;
    } catch (error) {
      console.error("Error creating project:hereeeeeeee", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, updatedFields }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/projects/${projectId}`, updatedFields);
      return response.data;
    } catch (error) {
      console.error(`Error updating project with ID ${projectId}:`, error);
      return rejectWithValue(error.message);
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
  projects: [],
  projectList: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  projectsPerPage: 10,
  selectedProject: null,  
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
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
        state.projectList = action.payload.data; 
        state.totalPages = Math.ceil(action.payload.totalCount / state.projectsPerPage);
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      })
      .addCase(fetchProjectsWithParams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectsWithParams.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.projectList = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        // console.log('state.projectList : ', state.projectList)
      })
      .addCase(fetchProjectsWithParams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex((project) => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })








      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const createProject = action.payload;
        state.projectList.push(createProject);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedProject = action.payload; 
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.projectList = state.projectList.filter((project) => project.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setSelectedProject } = projectSlice.actions;

export default projectSlice.reducer;

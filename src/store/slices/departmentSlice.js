import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../../axios";

export const fetchDepartments = createAsyncThunk('departments/fetchDepartments', async () => {
  const response = await axiosInstance.get('/departments');
  return response.data;
});

const departmentsSlice = createSlice({
  name: 'departments',
  initialState: {
    departments: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default departmentsSlice.reducer;

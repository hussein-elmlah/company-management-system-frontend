import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../../axios";

export const sendContactMessage = createAsyncThunk(
  'contact/sendContactMessage',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/contactus', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default contactSlice.reducer;

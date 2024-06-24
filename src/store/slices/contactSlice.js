import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../../axios";

export const sendContactMessage = createAsyncThunk(
  'contact/sendContactMessage',
  async (formData) => {
    const response = await axiosInstance.post('/contactus', formData);
    return response.data;
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
        state.error = action.error.message;
      });
  }
});

export default contactSlice.reducer;

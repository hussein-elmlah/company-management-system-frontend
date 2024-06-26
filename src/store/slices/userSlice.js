import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData  } from '../../axios/user';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const user = await getUserData();
    return user;
  }
);

 

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.user.data;
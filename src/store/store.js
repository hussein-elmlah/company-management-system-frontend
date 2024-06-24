import { configureStore } from '@reduxjs/toolkit';
import projectReducer from "./slices/projectSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    user: userReducer,
  },
});



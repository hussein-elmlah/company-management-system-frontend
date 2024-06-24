import { configureStore } from '@reduxjs/toolkit';
import projectReducer from "./slices/projectSlice";
import userReducer from "./slices/userSlice";
import contactReducer from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    user: userReducer,
    contact: contactReducer,
  },
});



import { configureStore } from '@reduxjs/toolkit';
import projectReducer from "./slices/projectSlice";
import userReducer from "./slices/userSlice";
import contactReducer from './slices/contactSlice';
import departmentsReducer from './slices/departmentSlice';
import employeesReducer from './slices/employeeSlice';
export const store = configureStore({
  reducer: {
    projects: projectReducer,
    user: userReducer,
    contact: contactReducer,
    departments: departmentsReducer,
    employees: employeesReducer,
  },
});



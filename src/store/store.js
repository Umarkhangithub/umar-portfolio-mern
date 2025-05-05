import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger"; 
import projectsReducer from "../features/project/projectSlice"; 
import authReducer from "../features/auth/authSlice"; 
import contactReducer from "../features/contact/contactSlice"; 
import skillsReducer from "../features/skills/skillsSlice";
import servicesReducer from "../features/services/servicesSlice"; 
import profileReducer from "../features/profile/profileSlice"

export const store = configureStore({
  reducer: {
    projects: projectsReducer, 
    auth: authReducer,
    contact: contactReducer, 
    skills: skillsReducer, 
    services: servicesReducer, // Add your services reducer here
    profile: profileReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger), // add logger middleware
});
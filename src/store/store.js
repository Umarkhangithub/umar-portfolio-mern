import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger"; 
import projectsReducer from "../features/project/projectSlice"; 
import authReducer from "../features/auth/authSlice"; 
import contactReducer from "../features/contact/contactSlice"; 
import skillsReducer from "../features/skills/skillsSlice";
import servicesReducer from "../features/services/servicesSlice"; 
import profileReducer from "../features/profile/profileSlice";

const isDev = import.meta.env.VITE_NODE_ENV === "development";

export const store = configureStore({
  reducer: {
    projects: projectsReducer, 
    auth: authReducer,
    contact: contactReducer, 
    skills: skillsReducer, 
    services: servicesReducer,
    profile: profileReducer
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();
    return isDev ? middleware.concat(logger) : middleware;
  }
});

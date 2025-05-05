import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeaders } from "../../utils/auth";

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_API_URL;

// Fetch all projects with pagination
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async ({ page = 1, limit = 6 } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}projects?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch single project
export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${API_URL}projects/${id}/view`, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add new project
export const addProject = createAsyncThunk(
  "projects/addProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.post(`${API_URL}projects`, projectData, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.put(`${API_URL}projects/${id}/edit`, data, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      await axios.delete(`${API_URL}projects/${id}`, { headers });
      return id; // just return ID
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  projects: [],
  project: null,
  loading: false,
  error: null,
  message: null,
  totalProjects: 0,
  totalPages: 0,
  currentPage: 1,
  projectsPerPage: 6,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearMessageAndError: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects || [];
        state.totalProjects = action.payload.totalProjects || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.currentPage || 1;
        state.projectsPerPage = action.payload.projectsPerPage || 6;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch projects";
      })

      // Fetch single project
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload.project;
        state.message = action.payload.message || "Project fetched successfully";
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch project";
      })

      // Add project
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Project added successfully";
        if (action.payload.project) {
          state.projects.unshift(action.payload.project);
        }
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add project";
      })

      // Update project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.project;
        state.message = action.payload.message || "Project updated successfully";
        const index = state.projects.findIndex((p) => p._id === updated._id);
        if (index !== -1) {
          state.projects[index] = updated;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update project";
      })

      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(p => p._id !== action.payload);
        state.message = "Project deleted successfully";
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete project";
      });
  },
});

export const { clearMessageAndError } = projectSlice.actions;
export default projectSlice.reducer;

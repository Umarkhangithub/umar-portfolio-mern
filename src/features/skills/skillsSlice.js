import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_API_URL

// Async Thunks
export const fetchSkills = createAsyncThunk("skills/fetchSkills", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}skills`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "Failed to fetch skills");
  }
});

// Fetch single skill by ID
export const fetchSkillById = createAsyncThunk("skills/fetchSkillById", async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}skills/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "Failed to fetch skill");
  }
});

export const addSkill = createAsyncThunk("skills/addSkill", async (skillData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}skills`, skillData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "Failed to add skill");
  }
});

export const updateSkill = createAsyncThunk("skills/updateSkill", async ({ id, skillData }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}skills/${id}`, skillData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "Failed to update skill");
  }
});

export const deleteSkill = createAsyncThunk("skills/deleteSkill", async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}skills/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "Failed to delete skill");
  }
});

// Slice
const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    skills: [],
    skill: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    resetSkillsState: (state) => {
      state.skills = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skills = action.payload.skills;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      })
      // Fetch single skill
      .addCase(fetchSkillById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkillById.fulfilled, (state, action) => {
        state.skill = action.payload.skill;
        state.loading = false;
      })
      .addCase(fetchSkillById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      })

      // Add
        .addCase(addSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills.unshift(action.payload.skill);
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.message = action.payload.message;
      })

      // Update
        .addCase(updateSkill.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex(skill => skill._id === action.payload._id);
        if (index !== -1) state.skills[index] = action.payload;
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.message = action.payload.message;
      })

      // Delete
        .addCase(deleteSkill.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter(skill => skill._id !== action.payload);
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetSkillsState } = skillsSlice.actions;
export default skillsSlice.reducer;

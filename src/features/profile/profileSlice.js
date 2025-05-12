import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeaders } from '../../utils/auth';

const API_URL = `${import.meta.env.VITE_REACT_APP_BACKEND_API_URL}profile`;

// Initial state
const initialState = {

  avatar: null,
  loading: false,
  error: null,
  message: null,
  socialLinks: [],
  resume: null
};


// Fetch avatar (optional use)
export const fetchAvatar = createAsyncThunk(
  'profile/fetchAvatar',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/avatar`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch resume (as Blob and convert to Object URL)
export const fetchResume = createAsyncThunk(
  'profile/fetchResume',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/resume/download`, {
        responseType: 'blob',
      });

      const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });

      const fileURL = URL.createObjectURL(fileBlob);
      return fileURL;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch resume.'
      );
    }
  }
);


// Fetch social links
export const fetchSocialLinks = createAsyncThunk(
  'profile/fetchSocialLinks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/social-links`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add profile
export const addProfile = createAsyncThunk(
  'profile/addProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.post(`${API_URL}`, formData, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Profile slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      // Add Profile
      .addCase(addProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.message = action.payload.message;
      })
      .addCase(addProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Avatar
      .addCase(fetchAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvatar.fulfilled, (state, action) => {
        state.loading = false;
          state.avatar = action.payload.avatar;
      })
      .addCase(fetchAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Resume
      .addCase(fetchResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.loading = false;
          state.resume = { url: action.payload };
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Social Links
      .addCase(fetchSocialLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialLinks.fulfilled, (state, action) => {
        state.loading = false;
          state.socialLinks = action.payload.socialLinks;
      })
      .addCase(fetchSocialLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;

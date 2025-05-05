import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_API_URL;

const initialState = {
    token: JSON.parse(localStorage.getItem('token')) || null,
    loading: false,
    error: null,
    message: '',
    user: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}admin/login`, userData, {
                headers: { 'Content-Type': 'application/json' },
            });

            const { token, admin, message } = response.data;

            // Store token in localStorage
            localStorage.setItem('token', JSON.stringify(token));

            return { token, admin, message };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.token = null;
            state.user = null;
            state.loading = false;
            state.error = null;
            state.message = '';
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.admin?.email || null;
                state.message = action.payload.message || 'Login successful';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                state.message = '';
            });
    },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;

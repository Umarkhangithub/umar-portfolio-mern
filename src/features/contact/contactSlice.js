import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_API_URL;

const initialState = {
  contact: null,
  contacts: [],
  pagination: null,
  message: null,
  loading: false,
  error: null,
};

// Send contact message
export const sendContactRequest = createAsyncThunk(
  "contact/sendContactRequest",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}contact`, contactData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      const err = error.response?.data;
      return rejectWithValue(err?.error || err?.message || error.message);
    }
  }
);

// Fetch contacts with pagination
export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}contact?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      const err = error.response?.data;
      return rejectWithValue(err?.error || err?.message || error.message);
    }
  }
);

// fetch contact by id
export const fetchContactById = createAsyncThunk(
  "contact/fetchContactById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}contact/${id}`);
      return response.data;
    } catch (error) {
      const err = error.response?.data;
      return rejectWithValue(err?.error || err?.message || error.message);
    }
  }
 
)

// Delete contact message
export const deleteContactMessage = createAsyncThunk(
    "contact/deleteContactMessage",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${API_URL}contact/${id}`);
        return response.data;
      } catch (error) {
        const err = error.response?.data;
        return rejectWithValue(err?.error || err?.message || error.message);
      }
    }
    );

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContactStatus: (state) => {
      state.contact = null;
      state.contacts = [];
      state.pagination = null;
      state.message = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactRequest.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(sendContactRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload.contact || null;
        state.message = action.payload.message || "Message sent successfully.";
        state.error = null;
      })
      .addCase(sendContactRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong.";
        state.message = null;
      })
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.contacts || [];
        state.pagination = action.payload.pagination || null;
        state.message = action.payload.message || "Contacts fetched successfully.";
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch contacts.";
      })
        .addCase(deleteContactMessage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteContactMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message || "Contact message deleted successfully.";
            state.error = null;
            // Remove the deleted contact from the contacts array
            state.contacts = state.contacts.filter(contact => contact._id !== action.meta.arg);
        })
        .addCase(deleteContactMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to delete contact message.";
        })
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      }
      )
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload.contact || null;
        state.message = action.payload.message || "Contact fetched successfully.";
        state.error = null;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch contact.";
      });
  },
});

export const { clearContactStatus } = contactSlice.actions;
export default contactSlice.reducer;

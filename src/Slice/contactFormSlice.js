// contactFormSlice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for form submission
export const submitForm = createAsyncThunk(
  'form/submitForm',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://example.domain/dev/v1/contact-us', data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
      } else {
        return rejectWithValue({ message: 'Network error' });
      }
    }
  }
);

const contactFormSlice = createSlice({
  name: 'form',
  initialState: {
    name: '',
    email: '',
    website_url: '',
    project_details: '',
    status: 'idle', // 'idle':'loading':'succeeded':'failed'
    error: null,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setWebsiteUrl: (state, action) => {
      state.website_url = action.payload;
    },
    setProjectDetails: (state, action) => {
      state.project_details = action.payload;
    },
    resetForm: (state) => {
      state.name = '';
      state.email = '';
      state.website_url = '';
      state.project_details = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { setName, setEmail, setWebsiteUrl, setProjectDetails, resetForm } = contactFormSlice.actions;
export default contactFormSlice.reducer;

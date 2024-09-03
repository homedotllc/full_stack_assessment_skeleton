import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});


export const fetchHomes = createAsyncThunk(
  'home/fetchHomes',
  async ({userId, page, take=10}) => {
    const response = await axiosInstance.get(`home/find-by-user/${userId}?page=${page}&take=${take}`);
    return response.data;
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    homes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHomes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.homes = action.payload;
      })
      .addCase(fetchHomes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default homeSlice.reducer;

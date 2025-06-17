// store/leadsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
  const res = await axios.get("/api/leads/list");
  console.log(res.data)
  return res.data;
});

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLeads(state, action) {
      state.leads = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.loading = false;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLeads } = leadsSlice.actions;
export default leadsSlice.reducer; // ✅ THIS LINE IS REQUIRED

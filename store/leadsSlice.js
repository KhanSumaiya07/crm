//store/leadsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
  const res = await axios.get("/api/leads/list")
  console.log(res.data)
  return res.data
})

export const fetchSingleLead = createAsyncThunk("leads/fetchSingleLead", async (id) => {
  const res = await axios.get(`/api/leads/${id}`)
  return res.data
})

export const updateLead = createAsyncThunk("leads/updateLead", async ({ id, data }) => {
  const res = await axios.put(`/api/leads/${id}`, data)
  return res.data
})

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    singleLead: null,
    loading: false,
    singleLeadLoading: false,
    updateLoading: false,
    error: null,
  },
  reducers: {
    setLeads(state, action) {
      state.leads = action.payload
    },
    clearSingleLead(state) {
      state.singleLead = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.leads = action.payload
        state.loading = false
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchSingleLead.pending, (state) => {
        state.singleLeadLoading = true
      })
      .addCase(fetchSingleLead.fulfilled, (state, action) => {
        state.singleLead = action.payload
        state.singleLeadLoading = false
      })
      .addCase(fetchSingleLead.rejected, (state, action) => {
        state.singleLeadLoading = false
        state.error = action.error.message
      })
      .addCase(updateLead.pending, (state) => {
        state.updateLoading = true
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.singleLead = action.payload
        state.updateLoading = false
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.updateLoading = false
        state.error = action.error.message
      })
  },
})

export const { setLeads, clearSingleLead } = leadsSlice.actions
export default leadsSlice.reducer

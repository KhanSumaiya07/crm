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

// in leadsSlice.js
export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update lead");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// leadsSlice.js
export const updateFollowUp = createAsyncThunk(
  "leads/updateFollowUp",
  async ({ leadId, followUpId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/leads/${leadId}/updatefollowup`, {
        followUpId,
        updatedData,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to update follow-up");
    }
  }
);




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
      .addCase(updateFollowUp.fulfilled, (state, action) => {
  state.leads = state.leads.map(lead =>
    lead._id === action.payload._id ? action.payload : lead
  );
  state.updateLoading = false;
})
.addCase(updateFollowUp.pending, (state) => {
  state.updateLoading = true;
})
.addCase(updateFollowUp.rejected, (state, action) => {
  state.updateLoading = false;
  state.error = action.payload;
});

  },
})

export const { setLeads, clearSingleLead } = leadsSlice.actions
export default leadsSlice.reducer

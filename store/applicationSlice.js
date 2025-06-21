import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Fetch all applications
export const fetchApplications = createAsyncThunk("applications/fetchAll", async () => {
  const res = await axios.get("/api/applications/list");
  return res.data;
});

// 🔎 Fetch a single application
export const fetchSingleApplication = createAsyncThunk("applications/fetchOne", async (id) => {
  const res = await axios.get(`/api/applications/${id}`);
  return res.data;
});

// ✏️ Update application
export const updateApplication = createAsyncThunk(
  "applications/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/applications/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update application");
    }
  }
);

// ➕ Create new application
export const createApplication = createAsyncThunk(
  "applications/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/applications", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create application");
    }
  }
);

// ❌ Delete application
export const deleteApplication = createAsyncThunk(
  "applications/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/applications/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete application");
    }
  }
);

// 📦 Slice
const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    singleApplication: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSingleApplication(state) {
      state.singleApplication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
      })
    .addCase(fetchApplications.fulfilled, (state, action) => {
  console.log("Applications fetched:", action.payload); // <--- add this
  state.loading = false;
  state.applications = action.payload;
})
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchSingleApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleApplication.fulfilled, (state, action) => {
        state.singleApplication = action.payload;
        state.loading = false;
      })
      .addCase(fetchSingleApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateApplication.fulfilled, (state, action) => {
        const updatedApp = action.payload;
        state.applications = state.applications.map((app) =>
          app._id === updatedApp._id ? updatedApp : app
        );
        state.singleApplication = updatedApp;
      })

      .addCase(createApplication.fulfilled, (state, action) => {
        state.applications.push(action.payload);
      })

      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.applications = state.applications.filter((a) => a._id !== action.payload);
      });
  },
});

export const { clearSingleApplication } = applicationSlice.actions;
export default applicationSlice.reducer;

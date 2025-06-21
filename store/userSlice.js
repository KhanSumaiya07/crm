import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  token: null,
  role: null,
  name : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.name = action.payload.name
    },
    logoutUser: (state) => {
      state.userId = null;
      state.token = null;
      state.role = null;
      state.name = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

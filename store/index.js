// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice';
import applicationReducer from "./applicationSlice";
import userReducer from "./userSlice"

export const store = configureStore({
  reducer: {
    user:userReducer,
    leads: leadsReducer,
    applications :applicationReducer

  },
});

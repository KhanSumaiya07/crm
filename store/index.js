// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice';
import applicationReducer from "./applicationSlice";

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    applications :applicationReducer
  },
});

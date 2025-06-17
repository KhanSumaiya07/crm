// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice';

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});

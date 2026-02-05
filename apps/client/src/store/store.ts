import { configureStore } from '@reduxjs/toolkit';
import machinesReducer from './slices/machinesSlice';

export const store = configureStore({
  reducer: {
    machines: machinesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import machinesReducer from './slices/machinesSlice';
import monitoringPointsReducer from './slices/monitoringPointsSlice';

export const store = configureStore({
  reducer: {
    machines: machinesReducer,
    monitoringPoints: monitoringPointsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

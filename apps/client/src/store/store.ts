import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import machinesReducer from './slices/machinesSlice';
import telemetryReducer from './slices/telemetrySlice';
import monitoringPointsReducer from './slices/monitoringPointsSlice';

export const store = configureStore({
  reducer: {
    machines: machinesReducer,
    telemetry: telemetryReducer,
    monitoringPoints: monitoringPointsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

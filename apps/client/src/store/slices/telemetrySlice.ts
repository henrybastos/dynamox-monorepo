import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

interface TelemetryMetrics {
  total_telemetry_count: number;
}

interface TelemetryHistoryPoint {
  timestamp: string;
  value: number;
  sensorId: string;
}

interface TelemetryState {
  metrics: TelemetryMetrics;
  history: TelemetryHistoryPoint[];
  loading: boolean;
  error: string | null;
}

const initialState: TelemetryState = {
  metrics: { total_telemetry_count: 0 },
  history: [],
  loading: false,
  error: null,
};

export const fetchTelemetryMetrics = createAsyncThunk(
  'telemetry/fetchMetrics',
  async () => {
    const response = await api.get('/telemetry/metrics');
    return response.data;
  }
);

export const fetchTelemetryHistory = createAsyncThunk(
  'telemetry/fetchHistory',
  async (sensorId: string) => {
    const response = await api.get(`/telemetry/${sensorId}`);
    return response.data; // Expecting array of objects
  }
);

const telemetrySlice = createSlice({
  name: 'telemetry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTelemetryMetrics.pending, (state) => { /* ... */ })
      .addCase(fetchTelemetryMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchTelemetryMetrics.rejected, (state, action) => { /* ... */ })
      .addCase(fetchTelemetryHistory.fulfilled, (state, action) => {
         state.history = action.payload;
      });
  },
});

export default telemetrySlice.reducer;

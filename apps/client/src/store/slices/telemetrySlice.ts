import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

export interface TelemetryRegistry {
  id: number;
  sensorId: string;
  accelerationValue: number;
  velocityValue: number;
  temperatureValue: number;
  timestamp: string;
  sensor?: {
    monitoringPoint: {
      name: string;
    };
  };
}

interface TelemetryState {
  items: TelemetryRegistry[];
  total: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TelemetryState = {
  items: [],
  total: 0,
  status: 'idle',
  error: null,
};

export const fetchTelemetry = createAsyncThunk(
  'telemetry/fetchAll',
  async ({ page, limit = 10 }: { page: number; limit?: number }) => {
    const response = await api.get('/telemetry', {
      params: { page, limit },
    });
    return response.data;
  }
);

export const deleteTelemetry = createAsyncThunk(
  'telemetry/delete',
  async (id: number) => {
    await api.delete(`/telemetry/${id}`);
    return id;
  }
);

const telemetrySlice = createSlice({
  name: 'telemetry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTelemetry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTelemetry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchTelemetry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch telemetry';
      })
      .addCase(deleteTelemetry.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.total -= 1;
      });
  },
});

export default telemetrySlice.reducer;

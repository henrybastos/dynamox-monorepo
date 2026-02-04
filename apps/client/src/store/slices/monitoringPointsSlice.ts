import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

interface MonitoringPoint {
  id: number;
  name: string;
  machineId: number;
  sensorId?: string;
  machine?: {
    name: string;
    type: string;
  };
  sensor?: {
    model: string;
  };
}

interface MonitoringPointsState {
  items: MonitoringPoint[];
  currentItem: MonitoringPoint | null;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: MonitoringPointsState = {
  items: [],
  currentItem: null,
  total: 0,
  loading: false,
  error: null,
};

export const fetchMonitoringPoints = createAsyncThunk(
  'monitoringPoints/fetchAll',
  async ({ page = 1, limit = 5, sortBy = 'name', sortOrder = 'asc' }: { page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc' }) => {
    const response = await api.get(`/monitoring-points?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
    return response.data;
  }
);

export const createMonitoringPoint = createAsyncThunk(
  'monitoringPoints/create',
  async (data: { name: string; machineId: number }) => {
    const response = await api.post('/monitoring-points', data);
    return response.data;
  }
);

export const associateSensor = createAsyncThunk(
  'monitoringPoints/associateSensor',
  async ({ id, data }: { id: number; data: { id: string; model: string } }) => {
    const response = await api.post(`/monitoring-points/${id}/sensors`, data);
    return response.data;
  }
);


export const fetchMonitoringPointDetails = createAsyncThunk(
  'monitoringPoints/fetchDetails',
  async (id: number) => {
    const response = await api.get(`/monitoring-points/${id}`);
    return response.data;
  }
);

const monitoringPointsSlice = createSlice({
  name: 'monitoringPoints',
  initialState,
  reducers: {
    clearCurrentItem: (state) => {
      state.currentItem = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonitoringPoints.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonitoringPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchMonitoringPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch monitoring points';
      })
      .addCase(fetchMonitoringPointDetails.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      });
      // ... other cases
  },
});

export const { clearCurrentItem } = monitoringPointsSlice.actions;

export default monitoringPointsSlice.reducer;

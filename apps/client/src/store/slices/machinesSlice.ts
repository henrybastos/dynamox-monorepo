import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

export interface Machine {
  id: number;
  name: string;
  type: string;
  monitoringPoints: any[];
}

interface MachinesState {
  items: Machine[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MachinesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchMachines = createAsyncThunk('machines/fetchMachines', async () => {
  const response = await api.get('/machines');
  return response.data;
});

const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMachines.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMachines.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMachines.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch machines';
      });
  },
});

export default machinesSlice.reducer;

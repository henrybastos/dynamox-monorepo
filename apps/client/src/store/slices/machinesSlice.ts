import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

interface Machine {
  id: number;
  name: string;
  type: 'Pump' | 'Fan';
}

interface MachinesState {
  items: Machine[];
  loading: boolean;
  error: string | null;
}

const initialState: MachinesState = {
  items: [],
  loading: false,
  error: null,
};

// API_URL is handled by the axios instance

export const fetchMachines = createAsyncThunk(
  'machines/fetchAll',
  async () => {
    const response = await api.get('/machines');
    return response.data;
  }
);

export const createMachine = createAsyncThunk(
  'machines/create',
  async (machine: Omit<Machine, 'id'>) => {
    const response = await api.post('/machines', machine);
    return response.data;
  }
);

export const deleteMachine = createAsyncThunk(
  'machines/delete',
  async (id: number) => {
    await api.delete(`/machines/${id}`);
    return id;
  }
);

const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMachines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMachines.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMachines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch machines';
      })
      .addCase(createMachine.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteMachine.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default machinesSlice.reducer;

'use client';
import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  IconButton, 
  Chip,
  Tooltip
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  Edit as EditIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchMachines, deleteMachine } from '../../../store/slices/machinesSlice';
import MachineDialog from './MachineDialog';

export default function MachinesPage() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.machines);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<any>(null); // For loading into dialog

  useEffect(() => {
    dispatch(fetchMachines());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this machine?')) {
      await dispatch(deleteMachine(id));
    }
  };

  const handleEdit = (machine: any) => {
      // Implement Update Logic in Slice first if needed, passing simple create for now
      // logic for update is similar to create but PATCH
      console.log('Edit feature pending:', machine);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Machine Name', flex: 1, minWidth: 150 },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip 
          label={params.value as string} 
          color={params.value === 'Pump' ? 'primary' : 'secondary'} 
          variant="outlined"
          size="small"
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
            <Tooltip title="Delete">
            <IconButton 
              size="small" 
              color="error" 
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="800">Machines</Typography>
          <Typography variant="body2" color="text.secondary">Manage your industrial assets</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
                startIcon={<RefreshIcon />} 
                onClick={() => dispatch(fetchMachines())}
                disabled={loading}
            >
                Refresh
            </Button>
            <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setIsDialogOpen(true)}
            >
            Add Machine
            </Button>
        </Box>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          height: 600, 
          width: '100%', 
          borderRadius: 2, 
          border: '1px solid rgba(0,0,0,0.05)',
          overflow: 'hidden' 
        }}
      >
        <DataGrid
          rows={items}
          columns={columns}
          initialState={{}}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          loading={loading}
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
                bgcolor: 'background.default',
            }
          }}
        />
      </Paper>

      <MachineDialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </Box>
  );
}

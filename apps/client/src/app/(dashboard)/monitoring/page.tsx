'use client';
import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid';
import { Refresh as RefreshIcon, AddLink as AddLinkIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchMonitoringPoints } from '../../../store/slices/monitoringPointsSlice';
import SensorDialog from './SensorDialog';
import { useRouter } from 'next/navigation';

export default function MonitoringPointsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, total, loading } = useAppSelector((state) => state.monitoringPoints);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'name', sort: 'asc' }]);
  
  const [sensorDialogOpen, setSensorDialogOpen] = useState(false);
  const [selectedPointId, setSelectedPointId] = useState<number | null>(null);

  const fetchData = () => {
    const sortField = sortModel[0]?.field || 'name';
    const sortOrder = sortModel[0]?.sort || 'asc';
    
    dispatch(fetchMonitoringPoints({ 
      page: page + 1, 
      limit: pageSize,
      sortBy: sortField === 'machineName' ? 'machineId' : sortField, 
      sortOrder: sortOrder as 'asc' | 'desc'
    }));
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, page, pageSize, sortModel]);

  const handleAddSensor = (id: number) => {
    setSelectedPointId(id);
    setSensorDialogOpen(true);
  };

  const columns = React.useMemo(() => [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Point Name', flex: 1, minWidth: 150 },
    { 
      field: 'machineName', 
      headerName: 'Machine', 
      flex: 1,
      valueGetter: (params: GridRenderCellParams) => params.row?.machine?.name || 'N/A'
    },
    { 
      field: 'machineType', 
      headerName: 'Type', 
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
         <Chip 
            label={params.row?.machine?.type || 'Unknown'} 
            size="small" 
            variant="outlined" 
         />
      )
    },
    { 
      field: 'sensorModel', 
      headerName: 'Sensor', 
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const model = params.row?.sensor?.model;
        return model ? (
          <Chip 
             label={model} 
             color="primary" 
             size="small" 
             onClick={() => router.push(`/monitoring/${params.row.id}`)}
             sx={{ cursor: 'pointer' }}
          />
        ) : (
          <Button 
            startIcon={<AddLinkIcon />} 
            size="small" 
            onClick={() => handleAddSensor(params.row.id)}
          >
            Add
          </Button>
        );
      }
    },
  ], [router]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="800">Monitoring Points</Typography>
          <Typography variant="body2" color="text.secondary">View and manage sensors</Typography>
        </Box>
        <Button startIcon={<RefreshIcon />} onClick={fetchData}>Refresh</Button>
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
          rowCount={total}
          loading={loading}
          rowsPerPageOptions={[5, 10, 20]}
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          onPageChange={(newPage: number) => setPage(newPage)}
          onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          disableSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
                bgcolor: 'background.default',
            }
          }}
        />
      </Paper>

      <SensorDialog
        open={sensorDialogOpen}
        onClose={() => setSensorDialogOpen(false)}
        monitoringPointId={selectedPointId}
        onSuccess={fetchData}
      />
    </Box>
  );
}

import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import MachineActionMenu from './MachineActionMenu';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    editable: false,
    align: 'left',
    flex: 1,
    minWidth: 100,
    renderHeader: () => (
      <Typography variant="body2" color="text.disabled" fontWeight={500} ml={1}>
        ID
      </Typography>
    ),
    renderCell: (params) => (
      <Stack ml={1} height={1} width={'min-content'} direction="column" alignSelf="center" justifyContent="center">
        <Typography variant="body2" fontWeight={600}>
          {params.value}
        </Typography>
      </Stack>
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 180,
    renderHeader: () => (
      <Typography variant="body2" color="text.disabled" fontWeight={500}>
        Name
      </Typography>
    ),
  },
  {
    field: 'monitoringPointsCount',
    headerName: 'Spots',
    editable: false,
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    minWidth: 80,
    renderHeader: () => (
      <Typography variant="body2" color="text.disabled" fontWeight={500}>
        Spots
      </Typography>
    ),
  },
  // {
  //   field: 'velocity',
  //   headerName: 'Vel (mm/s)',
  //   editable: false,
  //   headerAlign: 'center',
  //   align: 'center',
  //   flex: 1,
  //   minWidth: 100,
  //   renderHeader: () => (
  //     <Typography variant="body2" color="text.disabled" fontWeight={500}>
  //       Vel (mm/s)
  //     </Typography>
  //   ),
  //   renderCell: (params) => (
  //     <Typography variant="body2" fontWeight={600}>
  //       {params.value ?? '-'}
  //     </Typography>
  //   ),
  // },
  // {
  //   field: 'acceleration',
  //   headerName: 'Acc (g)',
  //   editable: false,
  //   headerAlign: 'center',
  //   align: 'center',
  //   flex: 1,
  //   minWidth: 100,
  //   renderHeader: () => (
  //     <Typography variant="body2" color="text.disabled" fontWeight={500}>
  //       Acc (g)
  //     </Typography>
  //   ),
  //   renderCell: (params) => (
  //     <Typography variant="body2" fontWeight={600}>
  //       {params.value ?? '-'}
  //     </Typography>
  //   ),
  // },
  // {
  //   field: 'temperature',
  //   headerName: 'Temp (°C)',
  //   editable: false,
  //   headerAlign: 'center',
  //   align: 'center',
  //   flex: 1,
  //   minWidth: 100,
  //   renderHeader: () => (
  //     <Typography variant="body2" color="text.disabled" fontWeight={500}>
  //       Temp (°C)
  //     </Typography>
  //   ),
  //   renderCell: (params) => (
  //     <Typography variant="body2" fontWeight={600}>
  //       {params.value ?? '-'}
  //     </Typography>
  //   ),
  // },
  {
    field: 'Action',
    headerName: '',
    headerAlign: 'right',
    align: 'right',
    editable: false,
    sortable: false,
    flex: 1,
    minWidth: 80,
    renderCell: () => <MachineActionMenu />,
  },
];

interface MachinesTableProps {
  searchText: string;
}

const MachinesTable = ({ searchText }: MachinesTableProps) => {
  const apiRef = useGridApiRef<GridApi>();
  const { items, status } = useSelector((state: RootState) => state.machines);

  const rows = useMemo(() => {
    return items.map((machine) => ({
      id: machine.id,
      name: machine.name,
      monitoringPointsCount: machine.monitoringPoints?.length || 0,
      velocity: null, // No telemetry in machines list for now
      acceleration: null,
      temperature: null,
    }));
  }, [items]);

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  return (
    <DataGrid
      apiRef={apiRef}
      loading={status === 'loading'}
      density="standard"
      columns={columns}
      rows={rows}
      rowHeight={52}
      disableColumnResize
      disableColumnMenu
      disableColumnSelector
      disableRowSelectionOnClick
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      autosizeOptions={{
        includeOutliers: true,
        includeHeaders: false,
        outliersFactor: 1,
        expand: true,
      }}
      slots={{
        pagination: DataGridFooter,
      }}
      pageSizeOptions={[10, 20]}
    />
  );
};

export default MachinesTable;

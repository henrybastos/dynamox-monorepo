import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { machinesRows } from 'data/machinesData';
import MachineActionMenu from './MachineActionMenu';

const columns: GridColDef<(typeof machinesRows)[number]>[] = [
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
      <Stack ml={1} height={1} direction="column" alignSelf="center" justifyContent="center">
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
    align: 'center',
    flex: 1,
    minWidth: 80,
    renderHeader: () => (
      <Typography variant="body2" color="text.disabled" fontWeight={500}>
        Spots
      </Typography>
    ),
  },
  {
    field: 'velocity',
    headerName: 'Vel (mm/s)',
    editable: false,
    align: 'center',
    flex: 1,
    minWidth: 100,
    renderHeader: () => (
      <Typography variant="body2" color="text.disabled" fontWeight={500}>
        Vel (mm/s)
      </Typography>
    ),
    renderCell: (params) => (
        <Typography variant="body2" fontWeight={600}>
          {params.value}
        </Typography>
    ),
  },
  {
    field: 'acceleration',
    headerName: 'Acc (g)',
    editable: false,
    align: 'center',
    flex: 1,
    minWidth: 100,
    renderHeader: () => (
      <Typography variant="body2" color="text.disabled" fontWeight={500}>
        Acc (g)
      </Typography>
    ),
    renderCell: (params) => (
        <Typography variant="body2" fontWeight={600}>
          {params.value}
        </Typography>
    ),
  },
  {
    field: 'temperature',
    headerName: 'Temp (°C)',
    editable: false,
    align: 'center',
    flex: 1,
    minWidth: 100,
    renderHeader: () => (
      <Typography variant="body2" color="text.disabled" fontWeight={500}>
        Temp (°C)
      </Typography>
    ),
    renderCell: (params) => (
        <Typography variant="body2" fontWeight={600}>
          {params.value}
        </Typography>
    ),
  },
  {
    field: 'Action',
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

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  return (
    <DataGrid
      apiRef={apiRef}
      density="standard"
      columns={columns}
      rows={machinesRows}
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

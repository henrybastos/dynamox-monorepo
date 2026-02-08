import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Stack, Box } from '@mui/material';
import { AppDispatch, RootState } from 'store/store';
import { fetchTelemetry, deleteTelemetry } from 'store/slices/telemetrySlice';
import PageTitle from 'components/common/PageTitle';
import TelemetryTable from 'components/sections/telemetry/TelemetryTable';

const Telemetry = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, total, status } = useSelector((state: RootState) => state.telemetry);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTelemetry({ page, limit: 10 }));
  }, [dispatch, page]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this telemetry registry?')) {
      dispatch(deleteTelemetry(id));
    }
  };

  return (
    <>
      <PageTitle title="Telemetry Registries" />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Telemetry Registries
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Historical records of all sensor readings
            </Typography>
          </Box>
        </Stack>

        <TelemetryTable 
          telemetry={items}
          loading={status === 'loading'}
          total={total}
          page={page}
          onPaginationChange={setPage}
          onDelete={handleDelete}
        />
      </Container>
    </>
  );
};

export default Telemetry;

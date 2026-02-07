import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Stack, Box, Paper } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import { AppDispatch, RootState } from 'store/store';
import { fetchMonitoringPoints, updateTelemetry } from 'store/slices/monitoringPointsSlice';
import PageTitle from 'components/common/PageTitle';
import MonitoringPointsTable from 'components/sections/monitoring-points/MonitoringPointsTable';
import IconifyIcon from 'components/base/IconifyIcon';
import AddMonitoringPointDialog from 'components/sections/monitoring-points/AddMonitoringPointDialog';
import { Button } from '@mui/material';

const MonitoringPoints = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, total, status } = useSelector((state: RootState) => state.monitoringPoints);
  const [page, setPage] = useState(1);
  const [isConnected, setIsConnected] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMonitoringPoints({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    // Connect to Socket.io server
    const socket: Socket = io('http://localhost:3000', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected to Telemetry WebSocket');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Telemetry WebSocket');
      setIsConnected(false);
    });

    socket.on('telemetry_update', (data) => {
      // Dispatch update to Redux
      dispatch(updateTelemetry({
        sensorId: data.sensorId,
        telemetry: {
          accelerationValue: data.accelerationValue,
          velocityValue: data.velocityValue,
          temperatureValue: data.temperatureValue,
          timestamp: data.timestamp,
        }
      }));
    });

    dispatch(fetchMonitoringPoints({ page }));

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <>
      <PageTitle title="Monitoring Points" />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Monitoring Points
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Real-time telemetry from all industrial points
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Paper 
              elevation={0} 
              sx={{ 
                  px: 2, 
                  py: 1, 
                  bgcolor: isConnected ? 'success.lighter' : 'error.lighter', 
                  color: isConnected ? 'success.dark' : 'error.dark',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  borderRadius: 2,
                  transition: 'all 0.3s ease'
              }}
            >
              <IconifyIcon icon={isConnected ? 'ic:baseline-rss-feed' : 'tabler:wifi-off'} />
              <Typography variant="subtitle2" fontWeight={600}>
                {isConnected ? 'Live Connection Active' : 'Disconnected'}
              </Typography>
            </Paper>
            <Button 
              variant="contained" 
              startIcon={<IconifyIcon icon="tabler:plus" />}
              onClick={() => setIsDialogOpen(true)}
              sx={{ fontWeight: 700 }}
            >
              Add Point
            </Button>
          </Stack>
        </Stack>

        <MonitoringPointsTable 
          monitoringPoints={items}
          loading={status === 'loading'}
          total={total}
          page={page}
          onPaginationChange={setPage}
        />

        <AddMonitoringPointDialog 
          open={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
        />
      </Container>
    </>
  );
};

export default MonitoringPoints;

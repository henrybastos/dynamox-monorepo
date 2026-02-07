import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Stack, Box, Paper } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import { AppDispatch, RootState } from 'store/store';
import { fetchMonitoringPoints, updateTelemetry } from 'store/slices/monitoringPointsSlice';
import PageTitle from 'components/common/PageTitle';
import MonitoringPointsTable from 'components/sections/monitoring-points/MonitoringPointsTable';
import IconifyIcon from 'components/base/IconifyIcon';

const MonitoringPoints = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, total, status } = useSelector((state: RootState) => state.monitoringPoints);
  const [page, setPage] = useState(1);

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
          <Paper 
            elevation={0} 
            sx={{ 
                px: 2, 
                py: 1, 
                bgcolor: 'success.lighter', 
                color: 'success.dark',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderRadius: 2
            }}
          >
            <IconifyIcon icon="ic:baseline-rss-feed" />
            <Typography variant="subtitle2" fontWeight={600}>
              Live Connection Active
            </Typography>
          </Paper>
        </Stack>

        <MonitoringPointsTable 
          monitoringPoints={items}
          loading={status === 'loading'}
          total={total}
          page={page}
          onPaginationChange={setPage}
        />
      </Container>
    </>
  );
};

export default MonitoringPoints;

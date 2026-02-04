'use client';
import React, { useEffect } from 'react';
import { Box, Typography, Button, Paper, Grid, Chip } from '@mui/material';
import { ArrowBack, Refresh } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { fetchMonitoringPointDetails, clearCurrentItem } from '../../../../store/slices/monitoringPointsSlice';
import { fetchTelemetryHistory } from '../../../../store/slices/telemetrySlice';
import TelemetryChart from '../../../../components/TelemetryChart';

export default function MonitoringPointDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentItem, loading: mpLoading } = useAppSelector((state) => state.monitoringPoints);
  const { history, loading: telemLoading } = useAppSelector((state) => state.telemetry);

  const id = parseInt(params.id);

  useEffect(() => {
    if (id) {
      dispatch(fetchMonitoringPointDetails(id));
    }
    return () => {
      dispatch(clearCurrentItem());
    };
  }, [dispatch, id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentItem?.sensorId) {
       dispatch(fetchTelemetryHistory(currentItem.sensorId));
       interval = setInterval(() => {
         dispatch(fetchTelemetryHistory(currentItem.sensorId!));
       }, 2000); // 2s refresh for "real-time" feel
    }
    return () => clearInterval(interval);
  }, [dispatch, currentItem?.sensorId]);

  if (!currentItem && mpLoading) {
    return <Box p={4}><Typography>Loading details...</Typography></Box>;
  }

  if (!currentItem && !mpLoading) {
    return <Box p={4}><Typography>Monitoring Point not found.</Typography></Box>;
  }

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mb: 2 }}>
        Back to List
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
           <Typography variant="h4" fontWeight="800">
             {currentItem?.name}
           </Typography>
           <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center' }}>
             <Typography variant="body2" color="text.secondary">
               Machine: <strong>{currentItem?.machine?.name}</strong> ({currentItem?.machine?.type})
             </Typography>
             {currentItem?.sensor && (
                <Chip label={`Sensor: ${currentItem.sensor.model}`} color="primary" size="small" />
             )}
           </Box>
        </Box>
        <Button 
          startIcon={<Refresh />} 
          onClick={() => currentItem?.sensorId && dispatch(fetchTelemetryHistory(currentItem.sensorId))}
          disabled={telemLoading}
        >
          Refresh Data
        </Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Box sx={{ width: '100%' }}>
           {currentItem?.sensor ? (
             <TelemetryChart 
                data={history} 
                sensorModel={currentItem.sensor.model} 
             />
           ) : (
             <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 1 }}>
                <Typography color="text.secondary">
                  No sensor associated with this monitoring point. 
                  Go back and add a sensor to start monitoring.
                </Typography>
             </Paper>
           )}
        </Box>
      </Box>
    </Box>
  );
}

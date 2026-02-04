'use client';
import React, { useEffect } from 'react';
import { Box, Paper, Typography, Button, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { 
  PrecisionManufacturing, 
  SettingsInputComponent, 
  Timeline, 
  Refresh, 
  ShowChart,
  CheckCircle,
  Person,
  Settings,
  Sensors
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchTelemetryMetrics } from '../../../store/slices/telemetrySlice';

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { metrics, loading } = useAppSelector((state) => state.telemetry);

  useEffect(() => {
    dispatch(fetchTelemetryMetrics());
    const interval = setInterval(() => {
      dispatch(fetchTelemetryMetrics());
    }, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, [dispatch]);

  const StatCard = ({ title, value, icon, color, subtext }: any) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          bgcolor: `${color}15`,
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
        <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${color}15`, color: color }}>
          {icon}
        </Box>
        {title === 'Total Telemetry' && (
           <IconButton size="small" onClick={() => dispatch(fetchTelemetryMetrics())} disabled={loading}>
             <Refresh fontSize="small" />
           </IconButton>
        )}
      </Box>
      <Box sx={{ zIndex: 1 }}>
        <Typography variant="h3" fontWeight="800" color="text.primary">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight="500">
          {title}
        </Typography>
        {subtext && (
           <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'success.main', fontWeight: 600 }}>
             {subtext}
           </Typography>
        )}
      </Box>
    </Paper>
  );

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="800" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the Dynamox Industrial Monitoring System.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Telemetry"
            value={metrics.total_telemetry_count.toLocaleString()}
            icon={<ShowChart fontSize="large" />}
            color="#692746"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="System Status"
            value="Operational"
            icon={<CheckCircle fontSize="large" />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Active Users"
            value="1"
            icon={<Person fontSize="large" />}
            color="#1976d2"
          />
        </Grid>
      </Grid>

      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Quick Navigation
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
           <Paper
             elevation={0}
             sx={{
               p: 3,
               borderRadius: 4,
               border: '1px solid rgba(0,0,0,0.05)',
               cursor: 'pointer',
               transition: 'transform 0.2s',
               '&:hover': { transform: 'translateY(-4px)' }
             }}
             onClick={() => router.push('/machines')}
           >
             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
               <Settings sx={{ fontSize: 40, color: '#692746', mr: 2 }} />
               <Typography variant="h6" fontWeight="bold">Manage Machines</Typography>
             </Box>
             <Typography color="text.secondary">Add, edit, or remove industrial machines from the system.</Typography>
           </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
           <Paper
             elevation={0}
             sx={{
                p: 3,
                borderRadius: 4,
                border: '1px solid rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
             }}
             onClick={() => router.push('/monitoring')}
           >
             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
               <Sensors sx={{ fontSize: 40, color: '#692746', mr: 2 }} />
               <Typography variant="h6" fontWeight="bold">Monitoring Points</Typography>
             </Box>
             <Typography color="text.secondary">View sensor data and associate sensors with monitoring points.</Typography>
           </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

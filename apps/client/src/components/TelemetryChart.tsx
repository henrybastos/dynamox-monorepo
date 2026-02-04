'use client';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Paper, Typography, Box } from '@mui/material';
import { format } from 'date-fns';

interface TelemetryChartProps {
  data: { timestamp: string; value: number }[];
  sensorModel?: string;
}

export default function TelemetryChart({ data, sensorModel }: TelemetryChartProps) {
  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
        <Typography>No telemetry data available yet.</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 1, height: 400, border: '1px solid rgba(0,0,0,0.05)' }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Real-time Telemetry
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(str) => format(new Date(str), 'HH:mm:ss')} 
            stroke="#9E9E9E"
            fontSize={12}
            tickMargin={10}
          />
          <YAxis stroke="#9E9E9E" fontSize={12} />
          <Tooltip 
            labelFormatter={(label) => format(new Date(label), 'MMM d, HH:mm:ss')}
            contentStyle={{ borderRadius: 1, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#692746" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#692746' }}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

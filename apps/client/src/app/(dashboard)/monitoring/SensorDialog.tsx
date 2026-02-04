'use client';
import React, { useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  MenuItem,
  Box
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppDispatch } from '../../../store/store';
import { associateSensor } from '../../../store/slices/monitoringPointsSlice';

const sensorSchema = z.object({
  id: z.string().min(1, 'Sensor ID is required'),
  model: z.enum(['TcAg', 'TcAs', 'HF+']),
});

type SensorFormValues = z.infer<typeof sensorSchema>;

interface SensorDialogProps {
  open: boolean;
  onClose: () => void;
  monitoringPointId: number | null;
  onSuccess: () => void;
}

export default function SensorDialog({ open, onClose, monitoringPointId, onSuccess }: SensorDialogProps) {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SensorFormValues>({
    resolver: zodResolver(sensorSchema),
    defaultValues: {
      id: '',
      model: 'TcAg',
    },
  });

  useEffect(() => {
    if (open) {
      reset({ id: '', model: 'TcAg' });
    }
  }, [open, reset]);

  const onSubmit = async (data: SensorFormValues) => {
    if (!monitoringPointId) return;
    try {
      await dispatch(associateSensor({ id: monitoringPointId, data })).unwrap();
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to associate sensor:', error);
      alert('Failed to associate sensor. Check if ID is unique or if machine type restrictions apply.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 1 } }}>
      <DialogTitle fontWeight="bold">
        Associate Sensor
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Controller
              name="id"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Unique Sensor ID"
                  placeholder="e.g., sensor_01"
                  fullWidth
                  error={!!errors.id}
                  helperText={errors.id?.message}
                />
              )}
            />
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Sensor Model"
                  fullWidth
                  error={!!errors.model}
                  helperText={errors.model?.message}
                >
                  <MenuItem value="TcAg">TcAg</MenuItem>
                  <MenuItem value="TcAs">TcAs</MenuItem>
                  <MenuItem value="HF+">HF+</MenuItem>
                </TextField>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Associate' : 'Confirm'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

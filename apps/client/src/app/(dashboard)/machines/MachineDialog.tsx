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
import { createMachine } from '../../../store/slices/machinesSlice';

const machineSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  type: z.enum(['Pump', 'Fan']),
});

type MachineFormValues = z.infer<typeof machineSchema>;

interface MachineDialogProps {
  open: boolean;
  onClose: () => void;
  initialValues?: MachineFormValues & { id?: number }; // For edit mode (future)
}

export default function MachineDialog({ open, onClose, initialValues }: MachineDialogProps) {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MachineFormValues>({
    resolver: zodResolver(machineSchema),
    defaultValues: {
      name: '',
      type: 'Pump',
    },
  });

  useEffect(() => {
    if (open) {
      reset(initialValues || { name: '', type: 'Pump' });
    }
  }, [open, initialValues, reset]);

  const onSubmit = async (data: MachineFormValues) => {
    try {
      await dispatch(createMachine(data)).unwrap();
      onClose();
      reset();
    } catch (error) {
      console.error('Failed to save machine:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle fontWeight="bold">
        {initialValues?.id ? 'Edit Machine' : 'Add New Machine'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Machine Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Machine Type"
                  fullWidth
                  error={!!errors.type}
                  helperText={errors.type?.message}
                >
                  <MenuItem value="Pump">Pump</MenuItem>
                  <MenuItem value="Fan">Fan</MenuItem>
                </TextField>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Machine'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

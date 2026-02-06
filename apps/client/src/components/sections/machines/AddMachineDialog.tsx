import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';
import { createMachine, updateMachine, Machine } from 'store/slices/machinesSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

interface AddMachineDialogProps {
  open: boolean;
  onClose: () => void;
  machine?: Machine | null;
}

const AddMachineDialog = ({ open, onClose, machine }: AddMachineDialogProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [type, setType] = useState<'Fan' | 'Pump'>('Fan');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(machine);

  useEffect(() => {
    if (open) {
      if (machine) {
        setName(machine.name);
        setType(machine.type as 'Fan' | 'Pump');
      } else {
        setName('');
        setType('Fan');
      }
      setError(null);
    }
  }, [open, machine]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError(null);
  };

  const handleTypeChange = (e: SelectChangeEvent) => {
    setType(e.target.value as 'Fan' | 'Pump');
  };

  const handleAddOrUpdate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (isEdit && machine) {
        await dispatch(updateMachine({ id: machine.id, data: { name, type } })).unwrap();
      } else {
        await dispatch(createMachine({ name, type })).unwrap();
      }
      setName('');
      setType('Fan');
      onClose();
    } catch (err: any) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} machine. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isLoading) return;
    setName('');
    setType('Fan');
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Updating machine' : 'Add Machine'}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} mt={1}>
          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
          <TextField
            id="machine-name"
            label="Machine Name"
            variant="filled"
            value={name}
            onChange={handleNameChange}
            placeholder="Boiler House Pump"
            autoComplete="email"
            fullWidth
            autoFocus
            disabled={isLoading}
            sx={{ mt: 3 }}
          />
          <FormControl fullWidth sx={{ mt: 3 }} disabled={isLoading}>
            <InputLabel id="machine-type-label">Machine Type</InputLabel>
            <Select
              labelId="machine-type-label"
              id="machine-type-select"
              value={type}
              onChange={handleTypeChange}
            >
              <MenuItem value="Fan">Fan</MenuItem>
              <MenuItem value="Pump">Pump</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleCancel} color="inherit" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleAddOrUpdate}
          variant="contained"
          color="primary"
          disabled={!name || isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? (isEdit ? 'Updating...' : 'Adding...') : (isEdit ? 'Update' : 'Add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMachineDialog;

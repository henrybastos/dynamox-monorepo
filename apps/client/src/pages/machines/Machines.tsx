import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MachinesSection from 'components/sections/machines';

const Machines = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MachinesSection />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Machines;

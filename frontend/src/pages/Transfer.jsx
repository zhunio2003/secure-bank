import { Container, Typography, TextField, Button, Box } from '@mui/material';

function Transfer() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h6" gutterBottom>
        Transferencia de fondos
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Cuenta destino" fullWidth />
        <TextField label="Monto" type="number" fullWidth />
        <Button variant="contained" color="primary">
          Enviar
        </Button>
      </Box>
    </Container>
  );
}

export default Transfer;

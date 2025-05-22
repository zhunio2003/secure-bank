import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h2" color="primary" gutterBottom>
        404 - Página no encontrada
      </Typography>
      <Typography variant="h5" gutterBottom>
        Uy, Miguelito... lo que buscas no existe 😅
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Pero tranquilo, puedes volver al inicio o explorar otras rutas seguras.
      </Typography>
      <Box>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Ir al inicio
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;

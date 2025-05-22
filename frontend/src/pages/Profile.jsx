import { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button,
  Box, Grid
} from '@mui/material';
import axios from 'axios';
import SnackbarAlert from '../components/SnackbarAlert'; // ✅ Se mantiene

function Profile() {
  const [password, setPassword] = useState('');
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [icon, setIcon] = useState('');

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  const token = localStorage.getItem('token');
  const iconOptions = ['🦁', '🐱', '🐶', '🐼', '🐧'];

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    }
  }, [token]);

  const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSnackMessage('');
    setSnackOpen(false);

    try {
      await api.put('/users/me/update', {
        password,
        secret_question: question,
        secret_answer: answer,
        icon_id: icon
      });

      setSnackMessage('Perfil actualizado correctamente');
      setSnackSeverity('success');
      setSnackOpen(true);

      setPassword('');
      setAnswer('');
      setQuestion('');
      setIcon('');
    } catch (err) {
      setSnackMessage(err.response?.data?.detail || 'Error al actualizar perfil');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>⚙️ Actualizar perfil</Typography>

      <Box component="form" onSubmit={handleUpdate} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nueva contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <TextField label="Nueva pregunta secreta" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        <TextField label="Nueva respuesta secreta" value={answer} onChange={(e) => setAnswer(e.target.value)} required />

        <Typography variant="subtitle2" sx={{ mt: 2 }}>Selecciona un nuevo icono:</Typography>
        <Grid container spacing={2}>
          {iconOptions.map((opt) => (
            <Grid item key={opt}>
              <Button
                variant={icon === opt ? 'contained' : 'outlined'}
                onClick={() => setIcon(opt)}
              >
                {opt}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Guardar cambios
        </Button>
      </Box>

      {/* Notificación visual */}
      <SnackbarAlert
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        onClose={() => setSnackOpen(false)}
      />
    </Container>
  );
}

export default Profile;

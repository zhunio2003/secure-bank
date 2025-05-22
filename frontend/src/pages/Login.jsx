import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/auth/login', { username, password });
      const { temp_token, secret_question, icon_id_options } = res.data;

      // Guardar datos en localStorage
      localStorage.setItem('username', username); // ✅ Aquí está lo que necesitabas
      localStorage.setItem('temp_token', temp_token);
      localStorage.setItem('secret_question', secret_question);
      localStorage.setItem('icon_id_options', JSON.stringify(icon_id_options));

      navigate('/2fa');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error en login');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h5" align="center">Iniciar sesión</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <TextField label="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <TextField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained" color="primary">Continuar</Button>
      </Box>
    </Container>
  );
}

export default Login;

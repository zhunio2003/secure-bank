import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SecondFactor() {
  const [answer, setAnswer] = useState('');
  const [icon, setIcon] = useState('');
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const icons = JSON.parse(localStorage.getItem('icon_id_options'));
    const q = localStorage.getItem('secret_question');
    setOptions(icons || []);
    setQuestion(q || '');
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/auth/second-factor', {
        temp_token: localStorage.getItem('temp_token'),
        secret_answer: answer,
        icon_id: icon
      });
      localStorage.setItem('token', res.data.access_token);
      navigate('/dashboard'); // o donde desees ir
    } catch (err) {
      setError(err.response?.data?.detail || 'Verificación fallida');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h6" gutterBottom>Segundo paso de verificación</Typography>
      <Typography variant="subtitle1" gutterBottom>{question}</Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleVerify}>
        <TextField fullWidth variant="outlined" label="Respuesta secreta" value={answer} onChange={(e) => setAnswer(e.target.value)} required sx={{ mb: 3 }} />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Selecciona tu ícono:</Typography>
        <Grid container spacing={2}>
          {options.map((opt) => (
            <Grid item key={opt}>
              <Button variant={icon === opt ? 'contained' : 'outlined'} onClick={() => setIcon(opt)}>
                {opt}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 4 }}>
          Verificar
        </Button>
      </form>
    </Container>
  );
}

export default SecondFactor;

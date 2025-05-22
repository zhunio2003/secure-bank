import { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Box, Button,
  TextField, Alert
} from '@mui/material';
import axios from 'axios';

function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [updatedAt, setUpdatedAt] = useState('');
  const [amount, setAmount] = useState('');
  const [toUser, setToUser] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

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

  const fetchBalance = async () => {
    try {
      const res = await api.get('/accounts/me');
      setBalance(res.data.saldo);
      setUpdatedAt(res.data.ultima_actualizacion);
    } catch (err) {
      setError('Error al cargar el estado de cuenta');
    }
  };

  useEffect(() => {
    if (token) {
      fetchBalance();
    }
  }, [token]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await api.post('/accounts/transfer', {
        to_username: toUser,
        amount: parseFloat(amount)
      });
      setMessage('Transferencia realizada correctamente');
      setToUser('');
      setAmount('');
      fetchBalance();
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al transferir');
    }
  };
                                    
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>💳 Estado de Cuenta</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Saldo disponible:</Typography>
        <Typography variant="h4" color="primary">${balance?.toFixed(2)}</Typography>
        <Typography variant="caption">Última actualización: {new Date(updatedAt).toLocaleString()}</Typography>
      </Paper>

      <Typography variant="h6" gutterBottom>💸 Transferir dinero</Typography>
      <Box component="form" onSubmit={handleTransfer} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Usuario destino" value={toUser} onChange={(e) => setToUser(e.target.value)} required />
        <TextField label="Monto" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <Button type="submit" variant="contained" color="primary">Transferir</Button>
      </Box>
    </Container>
  );
}

export default Dashboard;

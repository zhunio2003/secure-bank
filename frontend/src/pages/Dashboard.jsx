import { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Box, Button,
  TextField, Alert, Drawer, List, ListItem, ListItemIcon, 
  ListItemText, AppBar, Toolbar, Card, CardContent, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TuneIcon from '@mui/icons-material/Tune';
import ContactsIcon from '@mui/icons-material/Contacts';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const DRAWER_WIDTH = 240;

function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [updatedAt, setUpdatedAt] = useState('');
  const [amount, setAmount] = useState('');
  const [toUser, setToUser] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    }
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'Usuario');
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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    { text: 'Posición Consolidada', icon: <HomeIcon />, active: true },
    { text: 'Campañas', icon: <CampaignIcon /> },
    { text: 'Cuentas', icon: <AccountBalanceIcon /> },
    { text: 'Créditos', icon: <CreditCardIcon /> },
    { text: 'VISA Banco de Loja', icon: <CreditCardIcon /> },
    { text: 'Consultas', icon: <AssignmentIcon /> },
    { text: 'Transferencias', icon: <TransferWithinAStationIcon /> },
    { text: 'Pago y compra de servicios', icon: <ShoppingCartIcon /> },
    { text: 'Servicios bancarios', icon: <AccountTreeIcon /> },
    { text: 'Personalización', icon: <TuneIcon /> },
    { text: 'Contáctanos', icon: <ContactsIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Drawer lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#e8f4f8',
            borderRight: '1px solid #d0d0d0'
          },
        }}
      >
        <Box sx={{ p: 2, backgroundColor: '#ffffff', borderBottom: '1px solid #d0d0d0', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 40, height: 40, background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>B</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: '#2c5530', fontWeight: 'bold' }}>
            Banco Seguro
          </Typography>
        </Box>

        <List sx={{ pt: 1 }}>
          {menuItems.map((item) => (
            <ListItem button key={item.text} sx={{ py: 1, px: 2, backgroundColor: item.active ? '#4caf50' : 'transparent', color: item.active ? 'white' : '#555', '&:hover': { backgroundColor: item.active ? '#4caf50' : '#d4e6f1' } }}>
              <ListItemIcon sx={{ color: item.active ? 'white' : '#666', minWidth: 35 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: item.active ? 600 : 400 }} />
            </ListItem>
          ))}

          <Divider sx={{ my: 1 }} />

          <ListItem button sx={{ py: 1, px: 2, color: '#555', '&:hover': { backgroundColor: '#d4e6f1' } }} onClick={() => navigate('/profile')}>
            <ListItemIcon sx={{ color: '#666', minWidth: 35 }}><PersonIcon /></ListItemIcon>
            <ListItemText primary="Perfil" primaryTypographyProps={{ fontSize: '0.85rem' }} />
          </ListItem>

          <ListItem button sx={{ py: 1, px: 2, color: '#555', '&:hover': { backgroundColor: '#fbe9e7' } }} onClick={handleLogout}>
            <ListItemIcon sx={{ color: '#666', minWidth: 35 }}><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Cerrar Sesión" primaryTypographyProps={{ fontSize: '0.85rem' }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Barra superior con saludo */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: DRAWER_WIDTH,
          backgroundColor: '#fdd835',
          boxShadow: 'none',
          color: '#2c5530'
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 800,
              fontSize: '1.6rem',
              fontStyle: 'italic',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            👋 ¡Hola {username}!
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          marginTop: '64px',
          width: `calc(100% - ${DRAWER_WIDTH}px)`
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" sx={{ color: '#2e7d32', mb: 2, fontWeight: 600 }}>
              🏦 Estado de Cuenta
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
            <Card sx={{ backgroundColor: '#e8f5e8', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#1b5e20' }}>Saldo disponible:</Typography>
                <Typography variant="h3" sx={{ color: '#fdd835', fontWeight: 700 }}>${balance?.toFixed(2) || '0.00'}</Typography>
                <Typography variant="caption" sx={{ color: '#4e7c59' }}>Última actualización: {updatedAt ? new Date(updatedAt).toLocaleString() : 'N/A'}</Typography>
              </CardContent>
            </Card>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: '#2e7d32', mb: 3, fontWeight: 600 }}>💸 Transferir dinero</Typography>
            <Box component="form" onSubmit={handleTransfer} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField label="Usuario destino *" value={toUser} onChange={(e) => setToUser(e.target.value)} required fullWidth sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#fffde7', '& fieldset': { borderColor: '#fbc02d' }, '&:hover fieldset': { borderColor: '#f57f17' }, '&.Mui-focused fieldset': { borderColor: '#f57f17' } } }} />
              <TextField label="Monto *" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required fullWidth sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#fffde7', '& fieldset': { borderColor: '#fbc02d' }, '&:hover fieldset': { borderColor: '#f57f17' }, '&.Mui-focused fieldset': { borderColor: '#f57f17' } } }} />
              <Button type="submit" variant="contained" size="large" sx={{ backgroundColor: '#fdd835', color: '#333', fontWeight: 600, fontSize: '1rem', py: 1.5, '&:hover': { backgroundColor: '#fbc02d' } }}>
                TRANSFERIR
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;
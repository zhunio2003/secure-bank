import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Usuario';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('temp_token');
    localStorage.removeItem('icon_id_options');
    localStorage.removeItem('secret_question');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Banco Seguro 🏦
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="subtitle1" sx={{ alignSelf: 'center' }}>
            Hola, {username}
          </Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/profile')}>Perfil</Button>
          <Button color="inherit" onClick={handleLogout}>Cerrar sesión</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

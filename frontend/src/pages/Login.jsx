import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HelpIcon from '@mui/icons-material/Help';

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
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Elementos decorativos de fondo */}
      <Box sx={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        zIndex: 0
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -100,
        left: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.05)',
        zIndex: 0
      }} />

      {/* Header con logo */}
      <Box sx={{
        position: 'absolute',
        top: 20,
        left: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        zIndex: 2
      }}>
        <Box sx={{
          width: 45,
          height: 45,
          background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            B
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
            BANCO SEGURO
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>
            Banca Electrónica
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Contenedor principal */}
          <Box sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            p: 5,
            textAlign: 'center'
          }}>
            {/* Título principal */}
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                color: '#2c3e50',
                mb: 1,
                fontSize: { xs: '1.8rem', md: '2.2rem' }
              }}
            >
              Banca
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                color: '#2c3e50',
                mb: 1,
                fontSize: { xs: '1.8rem', md: '2.2rem' }
              }}
            >
              ELECTRÓNICA
            </Typography>

            {/* Subtítulo de bienvenida */}
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#34495e',
                fontWeight: 600,
                mb: 4,
                fontSize: '1.1rem'
              }}
            >
              BIENVENIDOS
            </Typography>

            {/* Mensaje informativo */}
            <Box sx={{
              background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%)',
              borderRadius: '12px',
              p: 3,
              mb: 4,
              border: '1px solid #d4edda'
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#2d5a3d',
                  lineHeight: 1.5,
                  fontSize: '0.9rem'
                }}
              >
                A la Banca Electrónica del Banco Seguro, trabajamos de forma continua
                para garantizar la seguridad de nuestros clientes, por ello hemos
                implementado un nuevo sistema de seguridad, si Ud. no tiene clave de
                acceso a este canal solicítela en cualquiera de nuestras oficinas.
              </Typography>
            </Box>

            {/* Formulario de login */}
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3, 
                  borderRadius: '12px',
                  '& .MuiAlert-message': { fontSize: '0.9rem' }
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Campo Usuario */}
              <TextField 
                label="Usuario *" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#fdfcdc',
                    fontSize: '1rem',
                    '& fieldset': { borderColor: '#ddd' },
                    '&:hover fieldset': { borderColor: '#4ECDC4' },
                    '&.Mui-focused fieldset': { borderColor: '#4ECDC4', borderWidth: '2px' }
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#4ECDC4' }
                }}
              />

              {/* Campo Contraseña */}
              <TextField 
                label="Contraseña *" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#fdfcdc',
                    fontSize: '1rem',
                    '& fieldset': { borderColor: '#ddd' },
                    '&:hover fieldset': { borderColor: '#4ECDC4' },
                    '&.Mui-focused fieldset': { borderColor: '#4ECDC4', borderWidth: '2px' }
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#4ECDC4' }
                }}
              />

              {/* Botón Ingresar */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  variant="contained"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 600,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)',
                    border: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #229954 0%, #27ae60 100%)',
                      boxShadow: '0 6px 20px rgba(46, 204, 113, 0.4)',
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  Ingresar ✓
                </Button>
              </motion.div>

              {/* Enlaces de ayuda */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                <Button 
                  variant="text" 
                  size="small"
                  sx={{ 
                    color: '#7f8c8d',
                    textTransform: 'none',
                    fontSize: '0.85rem',
                    '&:hover': { color: '#4ECDC4' }
                  }}
                >
                  ¿Olvidó su clave?
                </Button>
                <Button 
                  variant="text" 
                  size="small"
                  sx={{ 
                    color: '#7f8c8d',
                    textTransform: 'none',
                    fontSize: '0.85rem',
                    '&:hover': { color: '#4ECDC4' }
                  }}
                >
                  ¿Olvidó su usuario?
                </Button>
                <Button 
                  variant="contained"
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
                    color: 'white',
                    textTransform: 'none',
                    fontSize: '0.85rem',
                    borderRadius: '8px',
                    py: 0.8,
                    mt: 1,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)'
                    }
                  }}
                >
                  Activar Banca Electrónica
                </Button>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Íconos informativos en la parte inferior */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: 4,
            mt: 4,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <HelpIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
              <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>
                AYUDA
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <SecurityIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
              <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>
                SEGURIDAD
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <VerifiedUserIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
              <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>
                CONTACTO
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Login;
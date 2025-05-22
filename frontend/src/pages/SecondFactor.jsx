import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert, Box, Card } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function SecondFactor() {
  const [answer, setAnswer] = useState('');
  const [icon, setIcon] = useState('');
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const icons = JSON.parse(localStorage.getItem('icon_id_options'));
    const q = localStorage.getItem('secret_question');
    const user = localStorage.getItem('username');
    setOptions(icons || []);
    setQuestion(q || '');
    setUsername(user || '');
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

  // Función para obtener el emoji correcto basado en el ícono
  const getIconEmoji = (iconName) => {
    const iconMap = {
      'FARO': '🏰',
      'BASURERO': '🗑️',
      'AVION': '✈️',
      'BALON': '🏀',
      'MICROSCOPIO': '🔬',
      'MICROFONO': '🎤',
      'CORAZON': '❤️',
      'MARIPOSA': '🦋',
      'LLAVE': '🔑',
      'PALOMA': '🕊️'
    };
    return iconMap[iconName] || '⭐';
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header con logo */}
      <Box sx={{
        background: 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)',
        py: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: 50,
              height: 50,
              background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                B
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                BANCO SEGURO
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Siempre seguro y nuestro
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Elementos decorativos */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.05)',
        zIndex: 0
      }} />

      <Container maxWidth="md" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
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
            overflow: 'hidden'
          }}>
            {/* Header del formulario */}
            <Box sx={{
              background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
              p: 3,
              textAlign: 'center',
              color: 'white'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                ACCESO BANCA ELECTRÓNICA
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Bienvenido {username.toUpperCase()}
              </Typography>
            </Box>

            {/* Contenido del formulario */}
            <Box sx={{ p: 4 }}>
              {/* Mensaje de instrucciones */}
              <Box sx={{
                background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%)',
                borderRadius: '12px',
                p: 3,
                mb: 4,
                border: '1px solid #d4edda',
                textAlign: 'center'
              }}>
                <Typography variant="body1" sx={{ color: '#2d5a3d', mb: 2, fontWeight: 500 }}>
                  Por favor responda la siguiente pregunta y seleccione una imagen.
                </Typography>
              </Box>

              {/* Error alert */}
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

              <form onSubmit={handleVerify}>
                {/* Pregunta de seguridad */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ color: '#2c3e50', mb: 1, fontWeight: 600 }}>
                    Pregunta de seguridad:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#34495e', mb: 2, fontStyle: 'italic' }}>
                    {question}
                  </Typography>

                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Respuesta *"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#f8f9fa',
                        fontSize: '1rem',
                        '& fieldset': { borderColor: '#ddd' },
                        '&:hover fieldset': { borderColor: '#4ECDC4' },
                        '&.Mui-focused fieldset': { borderColor: '#4ECDC4', borderWidth: '2px' }
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#4ECDC4' }
                    }}
                  />

                  {/* Botón pregunta */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)',
                        color: 'white',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontSize: '0.8rem',
                        px: 2,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%)'
                        }
                      }}
                    >
                      🔄 Pregunta
                    </Button>
                  </Box>
                </Box>

                {/* Selección de íconos */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 600, textAlign: 'center' }}>
                    Por favor selecciona tu ícono asociado:
                  </Typography>

                  <Grid container spacing={3} justifyContent="center">
                    {options.map((opt) => (
                      <Grid item key={opt}>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={() => setIcon(opt)}
                            sx={{
                              fontSize: '3rem',
                              width: 80,
                              height: 80,
                              borderRadius: '16px',
                              border: icon === opt ? '3px solid #4ECDC4' : '2px solid #ccc',
                              backgroundColor: icon === opt ? '#e0f7fa' : '#fff',
                              boxShadow: icon === opt ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer'
                            }}
                          >
                            {opt}
                          </Button>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Botón Ingresar */}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={!answer || !icon}
                      sx={{
                        background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                        color: 'white',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: '12px',
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)',
                        minWidth: 150,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #229954 0%, #27ae60 100%)',
                          boxShadow: '0 6px 20px rgba(46, 204, 113, 0.4)',
                          transform: 'translateY(-1px)'
                        },
                        '&:disabled': {
                          background: '#bdc3c7',
                          color: '#7f8c8d',
                          boxShadow: 'none'
                        }
                      }}
                    >
                      Ingresar ✓
                    </Button>
                  </motion.div>
                </Box>
              </form>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default SecondFactor;
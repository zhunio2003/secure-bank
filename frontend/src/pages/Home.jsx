import { Button, Container, Typography, Box, TextField, InputAdornment, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Lottie from 'lottie-react';
import secureAnimation from '../assets/secure-animation.json';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

function Home() {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    }}>
      {/* Header */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 1.5,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Container maxWidth="xl" sx={{ px: 1 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            {/* Logo - MÁS pegado a la izquierda */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 1 }}>
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
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: -0.5 }}>
                  BANCO SEGURO
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Siempre seguro y nuestro
                </Typography>
              </Box>
            </Box>
            
            {/* Buscador - MÁS largo y pegado a la derecha */}
            <Box sx={{ mr: 1 }}>
              <TextField
                placeholder="Buscar servicios, pagos, transferencias..."
                size="medium"
                sx={{
                  width: 420,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    borderRadius: '8px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    fontSize: '1rem',
                    '& fieldset': { border: 'none' },
                    '&:hover': { 
                      backgroundColor: 'white',
                      border: '2px solid rgba(255,255,255,0.5)'
                    },
                    '&.Mui-focused': { 
                      backgroundColor: 'white',
                      border: '2px solid #4ECDC4'
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#666', fontSize: 24 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Sección Principal - MÁS PEQUEÑA */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
        py: 4,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Elementos decorativos */}
        <Box sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: 0
        }} />
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            py: 3
          }}>
            {/* Títulos principales centrados - MÁS PEQUEÑOS */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h1" 
                sx={{ 
                  color: 'white',
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 0.9,
                  mb: 1,
                  textShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }}
              >
                SERVICIOS
              </Typography>
              <Typography 
                variant="h1" 
                sx={{ 
                  color: 'white',
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 0.9,
                  mb: 4,
                  textShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }}
              >
                DIGITALES
              </Typography>
            </motion.div>

            {/* Contenedor principal con mensaje y animación - MÁS COMPACTO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Box sx={{ 
                display: 'flex',
                gap: 4,
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                mb: 4
              }}>
                {/* Caja de mensaje - MÁS PEQUEÑA */}
                <Box sx={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  p: 3,
                  minWidth: 280,
                  textAlign: 'left'
                }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: 'white',
                      fontWeight: 700,
                      mb: 1.5,
                      fontSize: { xs: '1.5rem', md: '1.8rem' }
                    }}
                  >
                    TRANQUILO,
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.95)',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      fontSize: { xs: '1rem', md: '1.1rem' }
                    }}
                  >
                    PAGUELO CON<br />
                    BANCO SEGURO<br />
                    O EN BANCA ELECTRÓNICA
                  </Typography>
                </Box>

                {/* Animación Lottie - MÁS PEQUEÑA */}
                <Box sx={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  p: 2.5,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                  <Box sx={{ width: { xs: 200, md: 240 } }}>
                    <Lottie animationData={secureAnimation} loop autoplay />
                  </Box>
                </Box>
              </Box>
            </motion.div>

            {/* Características centradas - MÁS COMPACTAS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                gap: { xs: 3, md: 6 },
                flexWrap: 'wrap',
                maxWidth: '700px'
              }}>
                <Box sx={{ textAlign: 'center', color: 'white', minWidth: 100 }}>
                  <AttachMoneyIcon sx={{ fontSize: 42, mb: 1, opacity: 0.9 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: '0.85rem' }}>
                    SIN COMISIONES<br />ADICIONALES
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', color: 'white', minWidth: 100 }}>
                  <SecurityIcon sx={{ fontSize: 42, mb: 1, opacity: 0.9 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: '0.85rem' }}>
                    OPERACIONES<br />100% SEGURAS
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', color: 'white', minWidth: 100 }}>
                  <VerifiedUserIcon sx={{ fontSize: 42, mb: 1, opacity: 0.9 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: '0.85rem' }}>
                    SEGURIDAD TOTAL<br />EN PAGOS Y<br />TRANSFERENCIAS
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Botones de servicios - MÁS COMPACTOS */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        py: 3,
        borderTop: '1px solid #dee2e6'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#495057',
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '1.8rem', md: '2.2rem' }
              }}
            >
              Nuestros Servicios
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#6c757d',
                maxWidth: '600px',
                mx: 'auto',
                fontSize: '1rem'
              }}
            >
              Accede a todos nuestros servicios bancarios de forma segura y confiable
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: 2.5,
            flexWrap: 'wrap',
            maxWidth: '800px',
            mx: 'auto'
          }}>
            {/* PERSONAS - Con funcionalidad de login */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  width: 180,
                  height: 120,
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                  color: 'white',
                  boxShadow: '0 6px 20px rgba(255, 107, 107, 0.25)',
                  border: 'none',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.35)',
                    transform: 'translateY(-4px)'
                  }
                }}
                onClick={() => navigate('/login')}
              >
                <CardContent sx={{ textAlign: 'center', p: 1.5 }}>
                  <PersonIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                    PERSONAS
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>

            {/* EMPRESAS */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  width: 180,
                  height: 120,
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
                  color: 'white',
                  boxShadow: '0 6px 20px rgba(78, 205, 196, 0.25)',
                  border: 'none',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(78, 205, 196, 0.35)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 1.5 }}>
                  <BusinessIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                    EMPRESAS
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>

            {/* MICROFINANZAS */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  width: 180,
                  height: 120,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.25)',
                  border: 'none',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.35)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 1.5 }}>
                  <AccountBalanceWalletIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                    MICROFINANZAS
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>

            {/* TARJETA DE CRÉDITO */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  width: 180,
                  height: 120,
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  boxShadow: '0 6px 20px rgba(240, 147, 251, 0.25)',
                  border: 'none',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(240, 147, 251, 0.35)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 1.5 }}>
                  <CreditCardIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                    TARJETA DE CRÉDITO
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default Home;
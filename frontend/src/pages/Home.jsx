import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Lottie from 'lottie-react';
import secureAnimation from '../assets/secure-animation.json';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Box sx={{ width: 250, mx: 'auto', mb: 4 }}>
            <Lottie animationData={secureAnimation} loop autoplay />
          </Box>

          <Typography variant="h3" color="primary" gutterBottom>
            🏦 Bienvenido a Banco Seguro
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Tu dinero, tus datos, tu tranquilidad.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Inicia sesión de forma segura usando autenticación de dos factores: <br />
            contraseña, pregunta secreta e ícono personalizado. 🔐
          </Typography>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button variant="contained" color="secondary" onClick={() => navigate('/login')}>
              Iniciar sesión
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* ✅ Pie de página */}
      <Footer />
    </>
  );
}

export default Home;

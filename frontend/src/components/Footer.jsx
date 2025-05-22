import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        py: 2,
        px: 2,
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
        borderTop: '1px solid #ccc'
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Banco Seguro. Todos los derechos reservados.
      </Typography>
      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
        Desarrollado por Miguelito 🧠 |  
        <Link href="https://github.com/" target="_blank" rel="noopener" sx={{ ml: 1 }}>
          GitHub
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;

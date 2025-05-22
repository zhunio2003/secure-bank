import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';

function AppLayout() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box flexGrow={1} sx={{ px: 2 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default AppLayout;

 

import React from 'react';
import { Container, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function Header() {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <WbSunnyIcon fontSize="large" color="primary" />
      <Typography variant="h3" component="h1" gutterBottom>
        Aplicación del Clima
      </Typography>
      <Typography variant="body1">
        El lugar donde el clima se encuentra con la tecnología.
      </Typography>
    </Container>
  );
}

export default Header;
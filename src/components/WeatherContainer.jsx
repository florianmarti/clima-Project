// src/components/WeatherContainer.jsx

import React from 'react';
import { Box, Paper } from '@mui/material';

function WeatherContainer({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5', // Un fondo gris claro para la página
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4, // padding de 4 unidades
          borderRadius: 2, // borde redondeado de 2 unidades
          width: '100%',
          maxWidth: 400, // ancho máximo de la tarjeta
          textAlign: 'center',
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}

export default WeatherContainer;
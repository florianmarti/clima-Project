import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

function WeatherDisplay({ data }) {
  // Aseguramos que data y sus propiedades existan antes de acceder a ellas
  if (!data || !data.main || !data.weather || data.weather.length === 0) {
    return <Typography color="error">Datos del clima no disponibles.</Typography>;
  }

  const { name, main, weather } = data;
  const temperature = Math.round(main.temp);
  const description = weather[0].description;
  const iconCode = weather[0].icon;

  return (
    <Box mt={3} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
      <Typography variant="h5" component="h2">
        {name}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <img
          src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt={description}
        />
        <Typography variant="h2">{temperature}°C</Typography>
      </Box>
      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
        {description}
      </Typography>
    </Box>
  );
}

export default WeatherDisplay;
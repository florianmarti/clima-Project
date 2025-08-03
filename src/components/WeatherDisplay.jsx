 

import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

// Función auxiliar para convertir a Fahrenheit
const toFahrenheit = (celsius) => (celsius * 9/5) + 32;

function WeatherDisplay({ data, isCelsius }) {
  if (!data || !data.main || !data.weather || data.weather.length === 0) {
    return <Typography color="error">Datos del clima no disponibles.</Typography>;
  }

  const { name, main, weather, wind } = data;
  const temperature = isCelsius ? Math.round(main.temp) : Math.round(toFahrenheit(main.temp));
  const feelsLike = isCelsius ? Math.round(main.feels_like) : Math.round(toFahrenheit(main.feels_like));
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const description = weather[0].description;
  const iconCode = weather[0].icon;
  const unit = isCelsius ? '°C' : '°F';

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
        <Typography variant="h2">{temperature}{unit}</Typography>
      </Box>
      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
        {description}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Sensación térmica: {feelsLike}{unit}</Typography>
        <Typography variant="body1">Humedad: {humidity}%</Typography>
        <Typography variant="body1">Viento: {windSpeed} m/s</Typography>
      </Box>
    </Box>
  );
}

export default WeatherDisplay;
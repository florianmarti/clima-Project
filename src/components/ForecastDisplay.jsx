 

import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider } from '@mui/material';

const toFahrenheit = (celsius) => (celsius * 9/5) + 32;

function ForecastDisplay({ data, isCelsius }) {
  if (!data || !data.list) {
    return <Typography color="error">Pronóstico no disponible.</Typography>;
  }

  const dailyForecasts = data.list.filter((reading) =>
    reading.dt_txt.includes("12:00:00")
  );

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short' };
    return date.toLocaleDateString('es-ES', options);
  };
  
  const unit = isCelsius ? '°C' : '°F';

  return (
    <Box mt={4} mb={2}>
      <Typography variant="h5" component="h2" gutterBottom>
        Pronóstico de 5 días
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2} justifyContent="center" columns={10}>
        {dailyForecasts.map((forecast) => (
          <Grid
            key={forecast.dt}
            
          >
            <Card raised>
              <CardContent>
                <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
                  {formatDay(forecast.dt_txt)}
                </Typography>
                <img
                  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                  alt={forecast.weather[0].description}
                  style={{ width: '50px' }}
                />
                <Typography variant="body2">
                  {isCelsius ? Math.round(forecast.main.temp) : Math.round(toFahrenheit(forecast.main.temp))}{unit}
                </Typography>
                <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                  {forecast.weather[0].description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ForecastDisplay;
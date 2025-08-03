// src/App.jsx

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WeatherContainer from './components/WeatherContainer';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay'; // Importamos el nuevo componente
import { CircularProgress, Typography } from '@mui/material';

// Función auxiliar para determinar la clase de CSS del fondo
const getBackgroundClass = (weatherMain) => {
  if (!weatherMain) return '';
  const lowerCaseWeather = weatherMain.toLowerCase();
  if (lowerCaseWeather.includes('clear')) return 'sunny-bg';
  if (lowerCaseWeather.includes('clouds')) return 'cloudy-bg';
  if (lowerCaseWeather.includes('rain') || lowerCaseWeather.includes('drizzle')) return 'rainy-bg';
  if (lowerCaseWeather.includes('snow')) return 'snowy-bg';
  return '';
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherCity, setWeatherCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // Nuevo estado para el pronóstico
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // useEffect para obtener las sugerencias del buscador
  useEffect(() => {
    const fetchCitySuggestions = async () => {
      setCitySuggestions([]);
      setError('');
      if (!searchQuery || searchQuery.length < 3) {
        return;
      }
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${apiKey}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('No se encontraron sugerencias');
        }
        const data = await response.json();
        setCitySuggestions(data);
      } catch (error) {
        console.error(error.message);
        setError('No se encontraron sugerencias');
        setCitySuggestions([]);
      }
    };
    fetchCitySuggestions();
  }, [searchQuery]);

  // useEffect para obtener el clima actual y el pronóstico (código corregido)
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!weatherCity) {
        setWeatherData(null);
        setForecastData(null);
        return;
      }
      setIsLoading(true);
      setError('');
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=${apiKey}&units=metric&lang=es`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherCity}&appid=${apiKey}&units=metric&lang=es`;
      try {
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
          fetch(currentWeatherUrl),
          fetch(forecastUrl),
        ]);
        if (!currentWeatherResponse.ok || !forecastResponse.ok) {
          throw new Error('Ciudad no encontrada. Por favor, revisa el nombre.');
        }
        const currentWeatherData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();
        setWeatherData(currentWeatherData);
        setForecastData(forecastData);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
        setWeatherData(null);
        setForecastData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeatherData();
  }, [weatherCity]);

  // Lógica para renderizar el contenido
  const renderContent = () => {
    if (isLoading) {
      return <CircularProgress sx={{ mt: 5 }} />;
    }
    if (error) {
      return <Typography color="error" sx={{ mt: 5 }}>{error}</Typography>;
    }
    if (weatherData && forecastData) {
      return (
        <>
          <WeatherDisplay data={weatherData} />
          <ForecastDisplay data={forecastData} /> {/* Agregamos el nuevo componente */}
        </>
      );
    }
    return <Typography sx={{ mt: 5, color: 'text.secondary' }}>Busca una ciudad para ver su clima.</Typography>;
  };

  const backgroundClass = getBackgroundClass(weatherData?.weather[0]?.main);

  return (
    <>
      <Header />
      <WeatherContainer backgroundClass={backgroundClass}>
        <SearchBar
          onSearch={setWeatherCity}
          onInputChange={setSearchQuery}
          suggestions={citySuggestions}
        />
        {renderContent()}
      </WeatherContainer>
    </>
  );
}

export default App;
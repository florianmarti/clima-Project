// src/App.jsx

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WeatherContainer from './components/WeatherContainer';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import UnitToggle from './components/UnitToggle';
import { CircularProgress, Typography } from '@mui/material';

// --- Función auxiliar para determinar la clase de CSS del fondo ---
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
  const [weatherSearch, setWeatherSearch] = useState({ city: null, coords: null });
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setWeatherSearch({
            city: null,
            coords: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.error(error);
          setError('No se pudo obtener la ubicación. Por favor, usa el buscador.');
        }
      );
    } else {
      setError('La geolocalización no está soportada por este navegador.');
    }
  }, []);

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

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      let currentWeatherUrl = null;
      let forecastUrl = null;

      if (weatherSearch.coords) {
        const { lat, lon } = weatherSearch.coords;
        currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;
      } else if (weatherSearch.city) {
        currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherSearch.city}&appid=${apiKey}&units=metric&lang=es`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherSearch.city}&appid=${apiKey}&units=metric&lang=es`;
      } else {
        setWeatherData(null);
        setForecastData(null);
        return;
      }
      
      setIsLoading(true);
      setError('');
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
  }, [weatherSearch]);

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
          <WeatherDisplay data={weatherData} isCelsius={isCelsius} />
          <ForecastDisplay data={forecastData} isCelsius={isCelsius} />
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
          onSearch={(city) => setWeatherSearch({ city, coords: null })}
          onInputChange={setSearchQuery}
          suggestions={citySuggestions}
        />
        <UnitToggle isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
        {renderContent()}
      </WeatherContainer>
    </>
  );
}

export default App;
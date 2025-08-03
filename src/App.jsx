// src/App.jsx

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WeatherContainer from './components/WeatherContainer';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
   const [searchQuery, setSearchQuery] = useState('');
  const [weatherCity, setWeatherCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState([]); 

  // useEffect para obtener las sugerencias del buscador
  useEffect(() => {
    const fetchCitySuggestions = async () => {
      // Solo busca si hay al menos 3 caracteres
      if (!searchQuery || searchQuery.length < 3) {
        setCitySuggestions([]);
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
        setCitySuggestions([]);
      }
    };
    fetchCitySuggestions();
  }, [searchQuery]); // Ahora depende de searchQuery

  // useEffect para obtener el clima de la ciudad seleccionada
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!weatherCity) return;
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=${apiKey}&units=metric&lang=es`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Ciudad no encontrada');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error.message);
        setWeatherData(null);
      }
    };
    fetchWeatherData();
  }, [weatherCity]); 

  return (
    <>
      <Header />
      <WeatherContainer>
        <SearchBar
          onSearch={setWeatherCity}
          onInputChange={setSearchQuery}  
          suggestions={citySuggestions}
        />
        {weatherData && <WeatherDisplay data={weatherData} />}
      </WeatherContainer>
    </>
  );
}

export default App;
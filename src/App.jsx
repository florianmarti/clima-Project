

import React, { useState } from "react";
import Header from "./components/Header";
import WeatherContainer from "./components/WeatherContainer";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import UnitToggle from "./components/UnitToggle";
import { CircularProgress, Typography } from "@mui/material";
import useWeather from "./hooks/useWeather"; 

function App() {
  const [isCelsius, setIsCelsius] = useState(true);
  const {
    searchQuery,
    setSearchQuery,
    setWeatherSearch,
    weatherData,
    forecastData,
    citySuggestions,
    isLoading,
    error,
    backgroundClass,
  } = useWeather();

  const renderContent = () => {
    if (isLoading) {
      return <CircularProgress sx={{ mt: 5 }} />;
    }
    if (error) {
      return (
        <Typography color="error" sx={{ mt: 5 }}>
          {error}
        </Typography>
      );
    }
    if (weatherData && forecastData) {
      return (
        <>
          <WeatherDisplay data={weatherData} isCelsius={isCelsius} />
          <ForecastDisplay data={forecastData} isCelsius={isCelsius} />
        </>
      );
    }
    return (
      <Typography sx={{ mt: 5, color: "text.secondary" }}>
        Busca una ciudad para ver su clima.
      </Typography>
    );
  };

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

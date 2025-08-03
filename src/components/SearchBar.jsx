// src/components/SearchBar.jsx

import React from 'react';
import { Box, Button, TextField, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onSearch, suggestions, onInputChange }) {
  const handleSearch = (event, value) => {
    // Si el valor seleccionado es un objeto, obtenemos su nombre
    // Si el valor es una cadena de texto, lo usamos directamente
    const cityToSearch = typeof value === 'string' ? value : value?.name;
    if (cityToSearch) {
      onSearch(cityToSearch);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
      <Autocomplete
        fullWidth
        options={suggestions || []}
        getOptionLabel={(option) => {
          // Si la opción no existe o no tiene nombre, devolvemos una cadena vacía para evitar errores
          if (!option || !option.name) return '';
          
          if (option.state) {
            return `${option.name}, ${option.state}, ${option.country}`;
          }
          return `${option.name}, ${option.country}`;
        }}
        // Proporcionamos una clave única y robusta para cada opción
        getOptionKey={(option) => {
          if (!option || !option.lat || !option.lon) {
            return Math.random().toString(36).substring(7);
          }
          return `${option.lat}-${option.lon}`;
        }}
        onInputChange={(event, newInputValue) => {
          onInputChange(newInputValue);
        }}
        onChange={handleSearch}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Busca una ciudad..."
            variant="outlined"
          />
        )}
      />
      <Button
        variant="contained"
        endIcon={<SearchIcon />}
        onClick={() => onSearch(suggestions[0]?.name || '')}
      >
        Buscar
      </Button>
    </Box>
  );
}

export default SearchBar;
// src/components/SearchBar.jsx

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) {
      console.log('Buscando el clima de:', city);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
      <TextField
        fullWidth
        label="Escribe una ciudad..."
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button variant="contained" endIcon={<SearchIcon />} onClick={handleSearch}>
        Buscar
      </Button>
    </Box>
  );
}

export default SearchBar;
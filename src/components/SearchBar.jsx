// src/components/SearchBar.jsx

import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
      <TextField
        fullWidth
        label="Escribe una ciudad..."
        variant="outlined"
      />
      <Button variant="contained" endIcon={<SearchIcon />}>
        Buscar
      </Button>
    </Box>
  );
}

export default SearchBar;
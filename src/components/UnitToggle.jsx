 

import React from 'react';
import { FormControlLabel, Switch, Box, Typography } from '@mui/material';

function UnitToggle({ isCelsius, setIsCelsius }) {
  const handleChange = (event) => {
    setIsCelsius(event.target.checked);
  };

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="body1" sx={{ mr: 1, fontWeight: 'bold' }}>°F</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={isCelsius}
            onChange={handleChange}
            color="primary"
          />
        }
        label=""
        labelPlacement="start"
      />
      <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>°C</Typography>
    </Box>
  );
}

export default UnitToggle;
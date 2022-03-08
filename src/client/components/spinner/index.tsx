import React from 'react';

import { CircularProgress } from '@mui/material';

const Spinner = () => (
  <div className="spinner" data-testid="spinner">
    <CircularProgress />
  </div>
);

export default Spinner;

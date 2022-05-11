import React from 'react';
import { Grid } from '@mui/material';

import PrefixList from './components/prefixList';

const gridStyle = {
  borderColor: "#313131",
  height: '100vh',
}

function App() {
  return ( 
    <div className='App'>
      <PrefixList />
    </div>
    );
}

export default App;

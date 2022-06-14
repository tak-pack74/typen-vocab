import React from 'react';
import { Grid } from '@mui/material';

import MessageCategories from './components/messageCategories';

const gridStyle = {
  borderColor: "#313131",
  height: '100vh',
}

function App() {
  return ( 
    <div className='App'>
      <MessageCategories />
    </div>
    );
}

export default App;

import React from 'react';
import { Grid } from '@mui/material';

import TypingGame from './components/typingGame';

const gridStyle = {
  borderColor: "#313131",
  height: '100vh',
}

function App() {
  return ( 
    <div className='App'>
      <TypingGame />
    </div>
    );
}

export default App;

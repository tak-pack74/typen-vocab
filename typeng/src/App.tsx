import React from 'react';
import { Grid } from '@mui/material';

import Sidebar from './components/side_bar';
import PrefixSelection from './components/prefix_selection';

const gridStyle = {
  border: "1px solid",
  borderColor: "#313131",
}

function App() {
  return ( 
    <div className='App'>
      <Grid container spacing={1}>
        <Grid item xs={2} style={gridStyle}>
          <Sidebar/>
        </Grid>
        <Grid item xs={10} style={gridStyle}>
          <PrefixSelection />
        </Grid>
      </Grid>
    </div>
    );
}

export default App;

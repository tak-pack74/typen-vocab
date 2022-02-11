import React from 'react';
import { Grid } from '@mui/material';

import Sidebar from './components/sideBar';
import PrefixList from './components/prefixList';

const gridStyle = {
  borderColor: "#313131",
  height: '100vh',
}

function App() {
  return ( 
    <div className='App'>
      <Grid container spacing={1}>
        <Grid item xs={2} style={gridStyle}>
          <Sidebar/>
        </Grid>
        <Grid item xs={10}>
          <PrefixList />
        </Grid>
      </Grid>
    </div>
    );
}

export default App;

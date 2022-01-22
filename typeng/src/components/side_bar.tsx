import React from "react";
import { List, ListItem, ListItemText, Paper } from '@mui/material';



const SideBar = () => {
  return (
    <div>
      <Paper sx={{ height: '100vh', bgcolor: '#313131', color: '#ffffff' }}
        elevation={5}
        variant='outlined'
        square={true}
      >
        <List>
          {
            ["HOME", "Prefixes", "Roots"].map(
              item => (
              <ListItem button>
                <ListItemText primary={item} sx={{ height: '100%'}}/>
              </ListItem>
              ))
          }
        </List>
      </Paper>
    </div>
    );
  };

export default SideBar;
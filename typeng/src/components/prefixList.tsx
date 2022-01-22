import React, { useState } from "react";
import { Checkbox, List, ListItem, ListItemText, Typography, Paper, Button } from '@mui/material';

import dictionary from "../dictionary";
import { useAppSelector, useAppDispatch } from '../store'
import { add, remove, selectPrefixList } from '../features/prefix_list/prefixSlice'

import TypingGameModal from "./TypingGameModal";

const PrefixList = () => {
  const dispatch = useAppDispatch();
  const hoge = useAppSelector(selectPrefixList);

  const [isTypingModalOpened, setIsTypingModalOpened] = useState<boolean>(false);
  const handleTypingModalOpen = () => setIsTypingModalOpened(true)

  return (
    <div>
      <Paper sx={{
          height: '100vh',
          bgcolor: '#dddddd'
        }}
        elevation={0}
        square={true}
      >
        <List>
          {Object.entries(dictionary).map(
            dict_item => (
                <ListItem>
                  <Checkbox
                    onChange={e => 
                      { if (e.target.checked) {
                        dispatch(add(dict_item[0]))
                      } else {
                        dispatch(remove(dict_item[0]))
                      }
                    }}
                  />
                  <ListItemText primary={dict_item[0]} sx={{ height: '100%'}}/>
                </ListItem>
            )
          )}
        </List>
        <Typography>Chosen Tags = {hoge.map(item => `${item}, `)}</Typography>
        <Button
          color="primary"
          onClick={handleTypingModalOpen}
        >
            START
        </Button>
        <TypingGameModal
          isTypingModalOpened={isTypingModalOpened}
          setIsTypingModalOpened={setIsTypingModalOpened}
        />
      </Paper>
    </div>
    );
  };

export default PrefixList;
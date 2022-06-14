import React, { useState } from "react";
import { Grid, Typography, Paper, Button } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../store'
import { add, remove, selectCategoryList } from '../features/category_list/categorySlice'

import TypingGameModal from "./typingGameModal";
import {categoryDataset} from '../types/category'

const PrefixList: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const chosenPrefixes = useAppSelector(selectCategoryList);

  const [isTypingModalOpened, setIsTypingModalOpened] = useState<boolean>(false);
  const handleTypingModalOpen = () => setIsTypingModalOpened(true)

  const dictionary:categoryDataset[] = require('../temporary_messages.json'); 

  const cardStyle = {
    zIndex: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%'
  }

  return (
    <div>
      <Paper
        elevation={0}
        square={true}
      >
        <Grid container>
        {dictionary.map(dict_item => (
          <Grid item xs={3}>
            <Button
              style={{
                width: '100%',
                color: 'black'
              }}
              variant={chosenPrefixes.includes(dict_item.id) ? "outlined" : "text"}
              onClick={() => {
                if (chosenPrefixes.includes(dict_item.id)) {
                  dispatch(remove(dict_item.id))
                } else {
                  dispatch(add(dict_item.id))
                }              
              }}
            >
              <Paper variant="outlined" style={cardStyle}>
                <Typography sx={{ fontSize: 20 }}>{dict_item.category}</Typography>
                <Typography>{dict_item.messages.length} Sentenses</Typography>
              </Paper>
            </Button>
          </Grid>
        ))}
        </Grid>
        <Typography>Chosen Tags = {chosenPrefixes.map(item => `${item}, `)}</Typography>
        {chosenPrefixes.length > 0 ? (
        <>
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
        </>) : null}
      </Paper>
    </div>
    );
  };

export default PrefixList;
import React, { useState } from "react";
import { Grid, Typography, Paper, Button } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../store'
import { add, remove, selectPrefixList } from '../features/prefix_list/prefixSlice'

import TypingGameModal from "./TypingGameModal";

interface prefixDataset{
  prefix: string
  meaning: string
  words: string[]
}


const PrefixList: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const chosenPrefixes = useAppSelector(selectPrefixList);

  const [isTypingModalOpened, setIsTypingModalOpened] = useState<boolean>(false);
  const handleTypingModalOpen = () => setIsTypingModalOpened(true)

  const dictionary:prefixDataset[] = require('../dictionary.json'); 

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
            <Button style={{width: '100%'}}>
              <Paper variant="outlined" style={cardStyle}>
                <Typography sx={{ fontSize: 20 }}>{dict_item.prefix}</Typography>
                <Typography>- {dict_item.meaning}</Typography>
                <Typography>{dict_item.words.length} Words</Typography>
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
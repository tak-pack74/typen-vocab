import React, { useState } from "react";
import { Grid, Typography, Paper, Button } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../store'
import { setCategory, deleteCategory, selectCategory } from '../../features/reduxSlices/sentenceSlice'

import { categoryDataset } from '../../types/category'

type Props = {
  handleStepChange: Function;
}

const CategoryList: React.FunctionComponent<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const chosenCategory = useAppSelector(selectCategory);

  const dictionary:categoryDataset[] = require('../../temporary_messages.json'); 

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
              variant={chosenCategory === dict_item.id ? "outlined" : "text"}
              onClick={() => {
                if (chosenCategory === dict_item.id) {
                  dispatch(deleteCategory())
                } else {
                  dispatch(setCategory(dict_item.id))
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
          <Button
            color="primary"
            onClick={() => props.handleStepChange(1)}
          >
            START
          </Button>
        </Grid>
      </Paper>
    </div>
    );
  };

export default CategoryList;
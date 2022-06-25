import React, { useState, useEffect } from "react";

import { Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store'
import { selectCategory } from '../../features/reduxSlices/sentenceSlice'
import { selectKeyPressCount, selectWrongKeyPressCount } from '../../features/reduxSlices/resultSlice'

import {message, categoryDataset} from '../../types/category'

const Results: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const chosenCategory = useAppSelector(selectCategory);
  const keyPressCount = useAppSelector(selectKeyPressCount);
  const wrongKeyPressCount = useAppSelector(selectWrongKeyPressCount);

  const categoryDataset:categoryDataset[] = require('../../temporary_messages.json'); 
  
  return (   
    <Paper>
      <Typography>総入力数：{keyPressCount}</Typography>
      <Typography>ミス入力数：{wrongKeyPressCount}</Typography>
      <Typography>正確率：{((keyPressCount - wrongKeyPressCount) / keyPressCount * 100).toFixed(2)}%</Typography>
    </Paper>
    )
};

   
//    <Typography>正確性：{((typedSentences.join().length + typedChar.length) / keyPressCount * 100).toFixed(1)}</Typography>
export default Results;
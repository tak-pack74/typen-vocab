import React, { useState, useEffect } from "react";

import { Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store'
import { selectCategory } from '../../features/reduxSlices/sentenceSlice'
import { selectKeyPressCount, selectWrongKeyPressCount, selectStartingTime, selectFinishingTime } from '../../features/reduxSlices/resultSlice'

import {message, categoryDataset} from '../../types/category'

const Results: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const chosenCategory = useAppSelector(selectCategory);
  const keyPressCount = useAppSelector(selectKeyPressCount);
  const wrongKeyPressCount = useAppSelector(selectWrongKeyPressCount);
  const startingTime = useAppSelector(selectStartingTime);
  const finishingTime = useAppSelector(selectFinishingTime);

  const categoryDataset:categoryDataset[] = require('../../temporary_messages.json'); 

  const elapsedSeconds = Math.round((finishingTime - startingTime) / 1000 * 100) / 100
  const elapsedMinutes = (finishingTime - startingTime) / 60000.0

  
  return (   
    <Paper>
      <Typography>経過時間：{elapsedSeconds}秒</Typography>
      <Typography>総入力数：{keyPressCount}</Typography>
      <Typography>ミス入力数：{wrongKeyPressCount}</Typography>
      <Typography>正確率：{((keyPressCount - wrongKeyPressCount) / keyPressCount * 100).toFixed(2)}%</Typography>
      <Typography>WPM：{(Math.round((keyPressCount - wrongKeyPressCount) / 5 / elapsedMinutes * 100) / 100)} Words</Typography>
    </Paper>
    )
};

   
//    <Typography>正確性：{((typedSentences.join().length + typedChar.length) / keyPressCount * 100).toFixed(1)}</Typography>
export default Results;
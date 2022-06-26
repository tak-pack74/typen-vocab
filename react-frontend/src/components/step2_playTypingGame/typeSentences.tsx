import React, { useState, useEffect } from "react";

import { Paper, Typography } from '@mui/material';

import useKeyPress from '../../hooks/useKeyPress';
import { useAppDispatch, useAppSelector } from '../../store'
import { message, categoryDataset } from '../../types/category'
import { selectCategory, saveSentenceIdList } from '../../features/reduxSlices/sentenceSlice'
import { addKeyPressCount, resetKeyPressCount, 
          addWrongKeyPressCount, resetWrongKeyPressCount,
          setStartingTime, setFinishingTime } from '../../features/reduxSlices/resultSlice'
import listRandomSentences from "../../features/listRandomSentence";
import { wrapHandler } from "framer-motion";

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) { 
    throw new Error(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}

type Props = {
  handleStepChange: Function;
}

const TypeSentences: React.FunctionComponent<Props> = (props: Props) => {
  const dispatch = useAppDispatch();

  const chosenCategory = useAppSelector(selectCategory);

  const categoryDataset:categoryDataset[] = require('../../temporary_messages.json'); 
  
  // ローカルstate群
  const [typedChar, setTypedChar] = useState<string>('');                         // 打鍵済み文字群
  const [currentChar, setCurrentChar] = useState<string>('');                     // 打鍵対象文字(常に1文字)
  const [followingChar, setFollowingChar] = useState<string>('');                 // currentCharを含まない未打鍵文字群
  const [translation, setTransration] = useState<string>('');                     // 現在の文章の翻訳文
  const [followingSentences, setFollowingSentences] = useState<message[]>([]);    // 次の文章たち
  
  useEffect(() => {
    const dataOfCategory = categoryDataset.find(item => item.id === chosenCategory)
    assertIsDefined(dataOfCategory)
    
    const sentenceIdList:number[] = listRandomSentences(dataOfCategory.messages.length)
    dispatch(saveSentenceIdList(sentenceIdList));
    
    let sentencesToType:message[] = [];
    sentenceIdList.map(sentenceId => {
      sentencesToType.push(dataOfCategory.messages[sentenceId])
    });

    // タイプ対象文に基づいてローカルStateの値を再定義
    setTypedChar('');
    setCurrentChar(sentencesToType[0].message.charAt(0));
    setTransration(sentencesToType[0].translation)
    setFollowingChar(sentencesToType[0].message.substring(1));
    setFollowingSentences(sentencesToType.splice(1));

    dispatch(resetKeyPressCount());
    dispatch(resetWrongKeyPressCount());
    dispatch(setStartingTime(Date.now()));
  }, [chosenCategory]);

  useKeyPress(key => {
    let newTypedChar:string = typedChar;
    let newFollowingChar:string = followingChar;
    dispatch(addKeyPressCount());
    
    if (key === currentChar) {
      newTypedChar += currentChar;
      setTypedChar(newTypedChar);
      setCurrentChar(followingChar.charAt(0));
      
      // 現在の文を打ち終わり、かつ次の文が存在しない場合
      if (followingChar.length === 0 && followingSentences.length === 0 ) {
        dispatch(setFinishingTime(Date.now()));
        props.handleStepChange(1);
        return;
      }

      // 現在の文を打ち終わった場合
      if (followingChar.length === 0) {
        // 次の文を表示する時
        setTypedChar('');
        setCurrentChar(followingSentences[0].message.charAt(0));
        setFollowingChar(followingSentences[0].message.substring(1));
        setTransration(followingSentences[0].translation)
        setFollowingSentences(followingSentences.splice(1));
        return;
      };
      
      newFollowingChar = followingChar.substring(1);
      setFollowingChar(newFollowingChar);
    } else {
        dispatch(addWrongKeyPressCount())
    };
  })

  return (   
    <Paper>
      <Typography>
        <span>{typedChar}</span>
        <span className='currentChar'>{currentChar}</span>
        <span>{followingChar}</span>
      </Typography>
      <Typography>{translation}</Typography>
    </Paper>
    )
};

export default TypeSentences;
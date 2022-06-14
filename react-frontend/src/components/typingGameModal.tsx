import React, { useState, useEffect } from "react";

import { Modal, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../store'
import { selectCategoryList } from '../features/category_list/categorySlice'

import useKeyPress from '../hooks/useKeyPress';
import {message, categoryDataset} from '../types/category'

// TODO：コンポーネントにまたがる状態管理はReduxに一元化すること
type Props = {
  isTypingModalOpened: boolean;
  setIsTypingModalOpened: Function;
}

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}

const TypingGameModal: React.FunctionComponent<Props> = props => {
  const chosenCategories = useAppSelector(selectCategoryList);
  const categoryDataset:categoryDataset[] = require('../temporary_messages.json'); 

  // ローカルstate
  const [typedSentences, setTypedSentences] = useState<string[]>([]);
  const [typedChar, setTypedChar] = useState<string>('');
  const [currentChar, setCurrentChar] = useState<string>('');
  const [followingChar, setFollowingChar] = useState<string>('');
  const [translation, setTransration] = useState<string>('');
  const [followingSentences, setFollowingSentences] = useState<message[]>([]);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [keyPressCount, setKeyPressCount] = useState<number>(0);


  useEffect(() => {
    let sentencesToType:message[] = [];
    chosenCategories.map(
      category_id => {
        const tempCategory = categoryDataset.find(item => item.id === category_id)
        assertIsDefined(tempCategory)
        sentencesToType = [ ...sentencesToType, ...tempCategory.messages ];
      }
    );
    setTypedSentences([]);
    setTypedChar('');
    setCurrentChar(sentencesToType[0].message.charAt(0));
    setTransration(sentencesToType[0].translation)
    setFollowingChar(sentencesToType[0].message.substring(1));
    setFollowingSentences(sentencesToType.splice(1));
    setKeyPressCount(0)
  }, [chosenCategories]);

  useKeyPress(key => {
    let newTypedChar:string = typedChar;
    let newFollowingChar:string = followingChar;

    setKeyPressCount(keyPressCount + 1);

    if (key === currentChar) {
      newTypedChar += currentChar;
      setTypedChar(newTypedChar);
      setCurrentChar(followingChar.charAt(0));
      
      if (followingChar.length === 0) {
        // 打鍵済みの単語を TypedSentences へ追加
        let newTypedSentences:string[] = typedSentences;
        newTypedSentences.push(newTypedChar)
        setTypedSentences(newTypedSentences);
  
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
    };
  })

  const handleTypingModalClose = () => props.setIsTypingModalOpened(false);
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '90%',
    width: '60%',
    bgcolor: '#fefefe',
    border: '1px solid #000',
    borderRadius: 1,
    p: 3, 
  };

  return (   
    <Modal
      open={props.isTypingModalOpened}
      onClose={handleTypingModalClose}  
    >
      <Paper sx={modalStyle}
        elevation={0}
      >
        <Typography>
          <span>{typedChar}</span>
          <span className='currentChar'>{currentChar}</span>
          <span>{followingChar}</span>
        </Typography>
        <Typography>{translation}</Typography>
        <Typography>タイプ回数：{keyPressCount}</Typography>
        <Typography>正確性：{((typedSentences.join().length + typedChar.length) / keyPressCount * 100).toFixed(1)}</Typography>
      </Paper>
    </Modal>
    )
};

export default TypingGameModal;
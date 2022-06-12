import React, { useState, useEffect } from "react";

import { Modal, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../store'
import { selectCategoryList } from '../features/category_list/categorySlice'

import useKeyPress from '../hooks/useKeyPress';

// TODO：コンポーネントにまたがる状態管理はReduxに一元化すること
type Props = {
  isTypingModalOpened: boolean;
  setIsTypingModalOpened: Function;
}

interface message{
  message: string
  translations: string
}

interface categoryDataset{
  id: number
  category: string
  messages: message[]
}

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}

const TypingGameModal: React.FunctionComponent<Props> = props => {
  const categoryList = useAppSelector(selectCategoryList);
  const dictionary:categoryDataset[] = require('../temporary_messages.json'); 

  // ローカルstate
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [typedChar, setTypedChar] = useState<string>('');
  const [currentChar, setCurrentChar] = useState<string>('');
  const [followingChar, setFollowingChar] = useState<string>('');
  const [englishDefinition, setEnglishDefinition] = useState<string[]>([]);
  const [followingWords, setFollowingWords] = useState<message[]>([]);


  useEffect(() => {
    let wordList:message[] = [];
    categoryList.map(
      category_id => {
        const wordsOfPrefix = dictionary.find(item => item.id == category_id)
        assertIsDefined(wordsOfPrefix)
        wordList = [ ...wordList, ...wordsOfPrefix.messages ];
      }
    );
    setTypedWords([]);
    setTypedChar('');
    setCurrentChar(wordList[0].message.charAt(0));
    setFollowingChar(wordList[0].message.substring(1));
    setFollowingWords(wordList.splice(1));
  }, [categoryList]);

  useKeyPress(key => {
    let newTypedChar:string = typedChar;
    let newFollowingChar:string = followingChar;

    if (key === currentChar) {
      newTypedChar += currentChar;
      setTypedChar(newTypedChar);
      setCurrentChar(followingChar.charAt(0));
      
      if (followingChar.length === 0) {
        // 打鍵済みの単語を TypedWords へ追加
        let newTypedWords:string[] = typedWords;
        newTypedWords.push(newTypedChar)
        setTypedWords(newTypedWords);
  
        // 次の単語を表示する時
        setTypedChar('');
        setCurrentChar(followingWords[0].message.charAt(0));
        setFollowingChar(followingWords[0].message.substring(1));
        setFollowingWords(followingWords.splice(1));
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
        {englishDefinition.map(definition =>
          <Typography>{definition}</Typography>
        )}
      </Paper>
    </Modal>
    )
};

export default TypingGameModal;
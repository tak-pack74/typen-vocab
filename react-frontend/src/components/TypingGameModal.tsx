import React, { useState, useEffect } from "react";

import { Modal, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../store'
import { selectPrefixList } from '../features/prefix_list/prefixSlice'

import useKeyPress from '../hooks/useKeyPress';
import APIService from './APIservice'


// TODO：コンポーネントにまたがる状態管理はReduxに一元化すること
type Props = {
  isTypingModalOpened: boolean;
  setIsTypingModalOpened: Function;
}

interface prefixDataset{
  prefix: string
  meaning: string
  words: string[]
}

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}

const TypingGameModal: React.FunctionComponent<Props> = props => {
  const prefixList = useAppSelector(selectPrefixList);
  const dictionary:prefixDataset[] = require('../dictionary.json'); 

  // ローカルstate
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [typedChar, setTypedChar] = useState<string>('');
  const [currentChar, setCurrentChar] = useState<string>('');
  const [followingChar, setFollowingChar] = useState<string>('');
  const [englishDefinition, setEnglishDefinition] = useState<string[]>([]);
  const [followingWords, setFollowingWords] = useState<string[]>([]);


  useEffect(() => {
    let wordList:string[] = [];
    prefixList.map(
      prefix => {
        const wordsOfPrefix = dictionary.find(item => item.prefix == prefix)
        assertIsDefined(wordsOfPrefix)
        wordList = [ ...wordList, ...wordsOfPrefix.words ];
      }
    );
    setTypedWords([]);
    setTypedChar('');
    setCurrentChar(wordList[0].charAt(0));
    setFollowingChar(wordList[0].substring(1));
    setFollowingWords(wordList.splice(1));
  }, [prefixList]);

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
        APIService.fetchEnglishDefinition(followingWords[0])
          .then(response => {
            const definition_texts:string[] = response['api_response']['definitions'].map((item: { 'definition': string; 'partOfSpeech': string; }) => {
              return item.definition
            });
            setEnglishDefinition(definition_texts);
          })
          .catch(error => console.log(error));
        setTypedChar('');
        setCurrentChar(followingWords[0].charAt(0));
        setFollowingChar(followingWords[0].substring(1));
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
import React, { useState, useEffect } from "react";

import { Modal, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../store'
import { selectPrefixList } from '../features/prefix_list/prefixSlice'

import dictionary from "../dictionary";

// TODO：コンポーネントにまたがる状態管理はReduxに一元化すること
type Props = {
  isTypingModalOpened: boolean;
  setIsTypingModalOpened: Function;
}

const TypingGameModal: React.FunctionComponent<Props> = props => {
  const prefixList = useAppSelector(selectPrefixList);
  const [wordList, setWordList] = useState<String[]>([]);

  useEffect(() => {
    let newWordList:string[] = [];
    prefixList.map(
      prefix => newWordList = [ ...newWordList, ...dictionary[prefix]]
    );
    setWordList(newWordList);
  },[prefixList])

  const handleTypingModalClose = () => props.setIsTypingModalOpened(false);
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '90%',
    width: '60%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 4,
    p: 4,
  };

  return (   
    <Modal
      open={props.isTypingModalOpened}
      onClose={handleTypingModalClose}  
    >
      <Paper sx={modalStyle}
        elevation={0}
      >
        <Typography>{wordList.map(word => `${word}, `)}</Typography>
      </Paper>
    </Modal>
    )
};

export default TypingGameModal;
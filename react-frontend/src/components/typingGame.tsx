import React, { useState } from "react";
import { Grid, Typography, Paper, Button } from '@mui/material';
import {AnimatePresence, motion} from 'framer-motion';


import MessageCategories from './step1_categoryOptions/messageCategories';
import TypeSentences from "./step2_playTypingGame/typeSentences";
import Results from "./step3_results/results";

const TypingGame: React.FunctionComponent = () => {
  const [[activeStepNum, direction], setActiveStepNum] = useState([0, 0]);

	const handleStepChange = (newDirection: number) => {
		const newStep = activeStepNum + newDirection;

		setTimeout(() => {
			setActiveStepNum([newStep, newDirection]);
		}, 0);

		window.scrollTo(0, 0);
	};

  const stepComponents = [
		<MessageCategories
			key={'firstStep'}
			handleStepChange={handleStepChange}
		/>,
		<TypeSentences
			key={'secondStep'}
			handleStepChange={handleStepChange}
		/>,
		<Results
			key={'thirdStep'}
		/>,
	];

  return (
    <div>
      <AnimatePresence>
        <motion.div
          custom={direction}
          variants={variants}
          initial='visible'
          animate='center'
          exit='exit'
        >
          {stepComponents[activeStepNum]}
        </motion.div>
      </AnimatePresence>
    </div>
    );
  };

export default TypingGame;

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};
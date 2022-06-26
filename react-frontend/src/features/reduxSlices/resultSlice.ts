import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { RootState } from '../../store';

export interface ResultState {
  keyPressCount: number;
  wrongKeyPressCount: number;
  startingTime: number;
  finishingTime: number;
}

const initialState: ResultState = {
  keyPressCount: 0,
  wrongKeyPressCount: 0,
  startingTime: 0,
  finishingTime: 0,
};

export const resultSlice = createSlice({
  name: 'resultSlice',
  initialState,
  reducers: {
    addKeyPressCount: state => {
      state.keyPressCount += 1;
    },
    resetKeyPressCount: state => {
      state.keyPressCount = 0;
    },
    addWrongKeyPressCount: state => {
      state.wrongKeyPressCount += 1;
    },
    resetWrongKeyPressCount: state => {
      state.wrongKeyPressCount = 0;
    },
    setStartingTime: (state, action: PayloadAction<number>) => {
      state.startingTime = action.payload;
    },
    setFinishingTime: (state, action: PayloadAction<number>) => {
      state.finishingTime = action.payload;
    }
  },
});

export const { addKeyPressCount, resetKeyPressCount, addWrongKeyPressCount, resetWrongKeyPressCount, setStartingTime, setFinishingTime } = resultSlice.actions;
export const selectKeyPressCount = (state: RootState) => state.result.keyPressCount;
export const selectWrongKeyPressCount = (state: RootState) => state.result.wrongKeyPressCount;
export const selectStartingTime = (state: RootState) => state.result.startingTime;
export const selectFinishingTime = (state: RootState) => state.result.finishingTime;

export default resultSlice.reducer;
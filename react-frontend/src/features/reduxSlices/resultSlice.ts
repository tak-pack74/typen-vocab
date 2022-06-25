import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface ResultState {
  keyPressCount: number;
  wrongKeyPressCount: number,
}

const initialState: ResultState = {
  keyPressCount: 0,
  wrongKeyPressCount: 0,
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
  },
});

export const { addKeyPressCount, resetKeyPressCount, addWrongKeyPressCount, resetWrongKeyPressCount } = resultSlice.actions;
export const selectKeyPressCount = (state: RootState) => state.result.keyPressCount;
export const selectWrongKeyPressCount = (state: RootState) => state.result.wrongKeyPressCount;

export default resultSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface sentenceState {
  category_id: number | null;
  sentence_id_list: number[];
}

const initialState: sentenceState = {
  category_id: null,
  sentence_id_list: [],
};

export const sentenceSlice = createSlice({
  name: 'categoryAndSentences',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category_id = action.payload;
    },
    deleteCategory: (state): void => {
      state.category_id = null;
    },
    saveSentenceIdList: (state, action: PayloadAction<number[]>): void => {
      state.sentence_id_list = action.payload;
    },  
  },
});

export const { setCategory, deleteCategory, saveSentenceIdList } = sentenceSlice.actions;
export const selectCategory = (state: RootState) => state.sentence.category_id;
export const selectSentenceIdList = (state: RootState) => state.sentence.sentence_id_list;

export default sentenceSlice.reducer;
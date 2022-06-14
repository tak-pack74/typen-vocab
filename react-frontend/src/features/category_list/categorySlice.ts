import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface CategoryListState {
  value: number[];
}

const initialState: CategoryListState = {
  value: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
        state.value.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>): void => {
        state.value = state.value.filter(category => {
          return category !== action.payload
        });
    }
  },
});

export const { add, remove } = categorySlice.actions;
export const selectCategoryList = (state: RootState) => state.category.value;

export default categorySlice.reducer;
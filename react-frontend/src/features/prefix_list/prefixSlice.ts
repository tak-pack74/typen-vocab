import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface PrefixListState {
  value: string[];
}

const initialState: PrefixListState = {
  value: [],
};

export const prefixSlice = createSlice({
  name: 'prefix',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
        state.value.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>): void => {
        state.value = state.value.filter(prefix => {
          return prefix !== action.payload
        });
    }
  },
});

export const { add, remove } = prefixSlice.actions;
export const selectPrefixList = (state: RootState) => state.prefix.value;

export default prefixSlice.reducer;
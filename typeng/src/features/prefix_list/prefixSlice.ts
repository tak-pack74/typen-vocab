import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface PrefixListState {
  value: String[];
}

const initialState: PrefixListState = {
  value: [],
};

export const prefixSlice = createSlice({
  name: 'prefix',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<String>) => {
        state.value.push(action.payload);
    },
    remove: (state, action: PayloadAction<String>) => {
        state.value = state.value.filter(prefix => {
          return prefix !== action.payload
        });
    }
  },
});

export const { add, remove } = prefixSlice.actions;
export const selectPrefixList = (state: RootState) => state.prefix.value;

export default prefixSlice.reducer;
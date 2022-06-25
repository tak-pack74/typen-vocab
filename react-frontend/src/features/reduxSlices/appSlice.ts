import {createSlice, PayloadAction} from '@reduxjs/toolkit';


type AppState = {
	instructionsStepNum: number;
	areInstructionsVisible: boolean;
};

const initialState: AppState = {
	instructionsStepNum: 0,
	areInstructionsVisible: true,
};

const AppSlice = createSlice({
	name: 'App',
	initialState,
	reducers: {
		goToInstructionsStep(state, action: PayloadAction<number>) {
			state.instructionsStepNum = action.payload;
		},
		setAreInstructionsVisible(state, action: PayloadAction<boolean>) {
			state.areInstructionsVisible = action.payload;
		},
	},
});

export default AppSlice;
import { configureStore } from '@reduxjs/toolkit';
import prefixReducer from './reducers/prefixReducer'

const store = configureStore({
  reducer: {
    prefix: prefixReducer,
  },
});

export default store;
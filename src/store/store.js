import { configureStore } from '@reduxjs/toolkit';
import chartReducer from './reducers/chartSlice';

export default configureStore({
  reducer: {
    chart: chartReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import upsSlice from './upsSlice';

export default configureStore({
  reducer: {
    upsSlice,
  },
});

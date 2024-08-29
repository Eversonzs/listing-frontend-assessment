import { configureStore } from '@reduxjs/toolkit';
import listingReducer from './slices/listingReducer';

const store = configureStore({
  reducer:{
    listing: listingReducer,
  }
});

export default store;

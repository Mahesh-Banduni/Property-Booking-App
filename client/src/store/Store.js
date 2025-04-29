import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './propertySlice';
import bookingReducer from './bookingSlice';

// If you have more reducers, add them here
const store = configureStore({
  reducer: {
    properties: propertyReducer,
    bookings: bookingReducer
  },
});

export default store;
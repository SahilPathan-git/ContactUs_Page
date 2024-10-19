import { configureStore } from '@reduxjs/toolkit';
import ContactFormReducer from '../Slice/contactFormSlice';

export const store = configureStore({
  reducer: {
    contact: ContactFormReducer,
  },
});

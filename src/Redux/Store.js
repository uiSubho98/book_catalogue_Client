import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/AuthSlice";
import {bookApi} from "./features/BooksSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/AuthSlice";
import { bookApi } from "./features/BooksSlice.js";
import { wishListApi } from "../Redux/features/WishList.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [wishListApi.reducerPath]: wishListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      bookApi.middleware,
      wishListApi.middleware
    ),
});

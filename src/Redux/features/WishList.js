import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "http://localhost:8080/api/v1/wishlist"
export const wishListApi = createApi({
  reducerPath: "wishListApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    wishlists: builder.query({
      query: () => "/",
      providesTags: ["Wishlist"],
      getCacheKey: () => "allWishlists",
     
    }),
    addWishlist: builder.mutation({
      query: (id) => ({
        url: `${baseUrl}/add/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist", "Books"],
    }),
    removeWishlist: builder.mutation({
        query: (id) => ({
          url: `${baseUrl}/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Wishlist", "Books"],
      }),
  }),
});

export const { useWishlistsQuery, useAddWishlistMutation, useRemoveWishlistMutation } = wishListApi;

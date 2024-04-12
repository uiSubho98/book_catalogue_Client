import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/book",
    keepUnusedDataFor: 30,
    prepareHeaders: (headers, { getState }) => {
      // Fetch the token from your Redux state
      const token = localStorage.getItem("token");

      // If a token exists, include it in the headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    books: builder.query({
      query: () => "/allBooks",
      providesTags: ["Books"],
      getCacheKey: () => "allBooks", // Provide a custom cache key
      keepUnusedDataFor: 5,
    }),
    AddBooks: builder.mutation({
      query: (formData) => ({
        url: `http://localhost:8080/api/v1/book/addBooks`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Books"],
    }),
    DeleteBooks: builder.mutation({
      query: (id) => ({
        url: `http://localhost:8080/api/v1/book/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const { useBooksQuery, useAddBooksMutation, useDeleteBooksMutation } = bookApi;

// BooksSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/book",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
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
      getCacheKey: () => "allBooks",
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
    EditBook: builder.mutation({
      query: ({ genre, pub_date, title, price, _id }) => ({
        url: `http://localhost:8080/api/v1/book/edit/${_id}`,
        method: "PUT",
        body: { genre, pub_date, title, price },
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useBooksQuery,
  useAddBooksMutation,
  useDeleteBooksMutation,
  useLazyBooksQuery,
  useEditBookMutation,
} = bookApi;

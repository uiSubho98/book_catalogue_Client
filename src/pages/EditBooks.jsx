import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  useBooksQuery,
  useDeleteBooksMutation,
  useEditBookMutation,
} from "../Redux/features/BooksSlice";
import { FaEdit, FaHeart, FaRegHeart } from "react-icons/fa";
import MultiStepLoaderDemo from "../components/Loading";
import { useNavigate } from "react-router-dom";
import {
  useRemoveWishlistMutation,
  useWishlistsQuery,
} from "../Redux/features/WishList";

const EditBooks = () => {
  const { user } = useSelector((state) => state.auth);
  const [editBook] = useEditBookMutation();
  const { data: booksData, isLoading } = useSelector((state) => {
    const queryKeys = Object.keys(state.booksApi.queries);
    const booksQueryKey = queryKeys.find((key) => key.startsWith("books"));
    if (state.booksApi.queries[booksQueryKey]) {
      return {
        data: state.booksApi.queries[booksQueryKey],
        isLoading: false,
      };
    } else {
      return {
        data: [],
        isLoading: true,
      };
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredWishListItems = booksData?.data?.data?.filter(
    (book) => book.author === user?.name
  );

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleEdit = async (newBook) => {
    const { poster, author, genre, pub_date, title, price, _id } = newBook;
    try {
      const res = await editBook({ genre, pub_date, title, price, _id });
      console.log(res);
      if (res?.data.statusCode === 200) {
        console.log("Edit done");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-wrap gap-10 w-[99%] mt-24 pb-4">
      <div className="w-[90%] h-full gap-y-8 gap-x-14 flex justify-start items-center flex-wrap">
        {filteredWishListItems?.map((card, index) => (
          <motion.div
            key={index}
            className="w-72 bg-transparent border-2 border-gray-600 shadow-md duration-500 hover:shadow-xl hover:cursor-pointer hover:border-white"
            whileHover={{ scale: 1.05, rotateY: 10 }}
          >
            <div className="flex justify-center items-center h-72">
              <img
                src={card?.poster}
                alt="Product"
                className="object-contain h-64 w-64"
              />
            </div>
            <div className="px-4 py-3 w-72">
              <div className="w-full h-full flex justify-between items-center">
                <p className="text-gray-400 mr-3 uppercase text-xs">
                  Title : {card.title}
                </p>
                <p className="text-gray-400 mr-3 uppercase text-xs">
                  Genre : {card.genre}
                </p>
              </div>
              <div className="w-full h-full flex flex-col justify-start items-start">
                <p className="text-lg font-bold text-white truncate block capitalize">
                  Author : {card.author}
                </p>
                <p className="text-lg font-bold text-white truncate block capitalize">
                  Published On : {card.pub_date}
                </p>
              </div>

              <div className="flex items-center w-full h-full">
                <p className="text-lg font-semibold text-white cursor-auto my-3">
                  Price: $ {card.price}
                </p>
                <div className="ml-auto flex gap-x-6">
                  <FaEdit
                    onClick={() => handleEditClick(card)}
                    color="white"
                    style={{ transform: "scale(1.4)", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showModal && selectedBook && (
        <div className="fixed inset-0  bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-black border-2 border-white p-8 rounded-lg">
            <h2 className="text-xl text-white font-bold mb-4">
              Edit Book Details
            </h2>
            <form>
                          <div className="flex w-full h-full justify-between items-center gap-x-4">
                          <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={selectedBook.title}
                  onChange={(e) =>
                    setSelectedBook({ ...selectedBook, title: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  min={0}
                  max={5000}
                  id="price"
                  name="price"
                  value={selectedBook.price}
                  onChange={(e) =>
                    setSelectedBook({ ...selectedBook, price: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
             </div>
              <div className="mb-4">
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-white"
                >
                  Genre
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={selectedBook.genre}
                  onChange={(e) =>
                    setSelectedBook({ ...selectedBook, genre: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="pub_date"
                  className="block text-sm font-medium text-white"
                >
                  Publisher Date
                </label>
                <input
                  type="text"
                  id="pub_date"
                  name="pub_date"
                  value={selectedBook.pub_date}
                  onChange={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      pub_date: e.target.value,
                    })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              {/* Add other input fields for editing book details */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black-500 text-white rounded-md border-2 border-white"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(selectedBook);
                    handleModalClose();
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBooks;

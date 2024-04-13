import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  useBooksQuery,
  useDeleteBooksMutation,
} from "../Redux/features/BooksSlice";
import { useSelector } from "react-redux";
import MultiStepLoaderDemo from "../components/Loading";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  useAddWishlistMutation,
  useRemoveWishlistMutation,
  useWishlistsQuery,
} from "../Redux/features/WishList";

const AllBooks = () => {
  const { data, error, isLoading, isSuccess } = useBooksQuery(1);
  const {
    data: wishListItem,
    error: wishListError,
    isLoading: wish_Loading,
  } = useWishlistsQuery(1);
  const { user } = useSelector((state) => state.auth);
  const [deleteBook] = useDeleteBooksMutation();
  const [addWishList] = useAddWishlistMutation(1);
  // console.log(data?.data?.title);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [deleteWishlist] = useRemoveWishlistMutation();
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value === "highToLow") {
      setPriceRange([5000, 0]);
    } else {
      setPriceRange([0, 5000]);
    }
  };
  if (isLoading || wish_Loading) {
    return <MultiStepLoaderDemo loading={isLoading} />;
  }

  const filteredBooks = data?.data?.filter((book) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const authorMatch = book.author
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const genreMatch = book.genre
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    let priceInRange;
    if (selectedValue === "highToLow") {
      priceInRange = book.price <= priceRange[0] && book.price >= priceRange[1];
    } else {
      priceInRange = book.price >= priceRange[0] && book.price <= priceRange[1];
    }

    return (titleMatch || authorMatch || genreMatch) && priceInRange;
  });
  const sortedBooks =
    selectedValue === "highToLow"
      ? filteredBooks.sort((a, b) => b.price - a.price)
      : filteredBooks;

  const handleDelete = async (id) => {
    try {
      const res = await deleteBook(id);
      console.log(res);
      if (res?.data.statusCode === 200) {
        console.log("deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdd = async (id) => {
    try {
      const res = await addWishList(id);
      console.log(res);
      if (res?.data.statusCode === 200) {
        console.log("added in wishlist");
      }
    } catch (error) {
      console.log(error);
    }
  };

console.log({sortedBooks});

  const isBookInWishlist = (bookId) => {
    return wishListItem?.data?.some((item) => item.bookId === bookId);
  };
  return (
    <div className="h-fit w-full py-4 pt-24  bg-black">
      <div className="w-full h-fit my-10 flex justify-evenly items-center flex-col sm:flex-row md:flex-row lg:flex-row">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Books"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 bg-transparent border-white text-white p-2 rounded mx-auto w-full sm:w-[45%] mb-4 lg:mb-0 backdrop-filter backdrop-blur-lg bg-opacity-10"
          style={{
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        />

        {/* Dropdown for sorting */}
        {/* <select
          className="border-2 bg-transparent border-white text-white p-2 rounded mx-auto w-full sm:w-[45%] mb-4 lg:mb-0 backdrop-filter backdrop-blur-lg bg-opacity-10"
          style={{
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
          value={selectedValue}
          onChange={handleSelectChange}
        >
          <option className="text-black cursor-pointer" value="lowToHigh">
            Price: Low to High
          </option>
          <option className="text-black cursor-pointer" value="highToLow">
            Price: High to Low
          </option>
        </select> */}
      </div>

      <div className="flex flex-wrap justify-evenly items-center gap-y-10 w-full ">
        {sortedBooks?.length > 0 &&
          sortedBooks?.map((card, index) => (
            <motion.div
              key={index}
              className="w-72 bg-transparent border-2 border-gray-600 shadow-md duration-500 hover:shadow-xl hover:cursor-pointer hover:border-white"
              whileHover={{ scale: 1.05, rotateY: 10 }}
            >
              <div className="flex justify-center items-center h-72">
                <img
                  src={card?.poster}
                  alt="Product"
                  className="object-cover h-64 w-64"
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
                  <div className="ml-auto flex gap-x-6 items-center">
                    {user?.name === card.author && (
                      <MdDelete
                        onClick={() => handleDelete(card?._id)}
                        color="red"
                        style={{ transform: "scale(1.5)" }}
                      />
                    )}
                    {isBookInWishlist(card._id) ? (
                      <FaHeart
                        onClick={() => {
                          deleteWishlist(card._id);
                        }}
                        color="white"
                        style={{ transform: "scale(1.5)" }}
                      />
                    ) : (
                      <FaRegHeart
                        color="white"
                        style={{ transform: "scale(1.5)" }}
                        onClick={() => handleAdd(card._id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        {sortedBooks.length <= 0 && (
          <h2 className="text-white ">No Book Found</h2>
        )}
      </div>
    </div>
  );
};

export default AllBooks;

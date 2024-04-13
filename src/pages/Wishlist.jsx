import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  useBooksQuery,
  useDeleteBooksMutation,
} from "../Redux/features/BooksSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import MultiStepLoaderDemo from "../components/Loading";
import {
  useRemoveWishlistMutation,
  useWishlistsQuery,
} from "../Redux/features/WishList";

const Wishlist = () => {
  const { data, error, isLoading, isSuccess } = useWishlistsQuery(2);
  const { data: booksData } = useSelector((state) => {
    const queryKeys = Object.keys(state.booksApi.queries);
    const booksQueryKey = queryKeys.find((key) => key.startsWith("books"));
    if (state.booksApi.queries[booksQueryKey]) {
      return state.booksApi.queries[booksQueryKey];
    } else {
      return [];
    }
  });
  const [deleteWishlist] = useRemoveWishlistMutation();
  if (isLoading || !booksData) {
    return <MultiStepLoaderDemo loading={isLoading} />;
  }
  const filteredWishListItems = booksData?.data?.filter((wishListItem) =>
    data?.data?.some((book) => book.bookId === wishListItem._id)
  );

  console.log(filteredWishListItems);
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
                  <FaHeart
                    onClick={() => {
                      deleteWishlist(card._id);
                    }}
                    color="white"
                    style={{ transform: "scale(1.5)" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

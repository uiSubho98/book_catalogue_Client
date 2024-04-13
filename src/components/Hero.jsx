import React from "react";
import { motion } from "framer-motion";
import { useBooksQuery } from "../Redux/features/BooksSlice";
import { useSelector } from "react-redux";
import MultiStepLoaderDemo from "./Loading";
import LoveIcon from "../Assets/LoveIcon";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useAddWishlistMutation,
  useRemoveWishlistMutation,
  useWishlistsQuery,
} from "../Redux/features/WishList";

const Hero = () => {
  const { data, error, isLoading, isSuccess } = useBooksQuery(1);
  const {
    data: wishListItem,
    error: wishListError,
    isLoading: wish_Loading,
  } = useWishlistsQuery(1);
  const [addWishList] = useAddWishlistMutation(1);
  // console.log(data?.data?.title);
  const [deleteWishlist] = useRemoveWishlistMutation();
  const navigate = useNavigate();
  if (isLoading || wish_Loading) {
    return <MultiStepLoaderDemo loading={isLoading} />;
  }
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

  const isBookInWishlist = (bookId) => {
    return wishListItem?.data?.some((item) => item.bookId === bookId);
  };
  return (
    <div className="h-fit w-full py-4 pt-10 bg-black">
      <style>
        {`
          @keyframes neon-blink {
            44% {
              opacity: 1;
            }
            45% {
              opacity: .7;
            }
            46% {
              opacity: 1;
            }
            98% {
              opacity: 1;
            }
            99% {
              opacity: .5;
            }
            100% {
              opacity: 1;
            }
          }

          .neon-title {
            animation: neon-blink 2s infinite alternate;
            color: #FF8888;
            font-weight: normal;
            margin: 0 auto;
            margin-bottom: 60px;
            text-align: center;
            text-shadow: 0 0 0 transparent, 0 0 20px rgb(255, 0, 0), 0 0 50px rgba(255, 0, 0,.5), 0 0 200px rgba(255, 0, 0, .5), 0 0 250px rgba(255, 0, 0, 1), 0 0 300px rgba(255, 0, 0, 1), -250px -100px 100px rgba(255, 0, 0, 1);
            text-transform: uppercase;
            white-space: nowrap;
          }
        `}
      </style>
      <h1 className="neon-title">
        <span className="inline-block">
          <span className="opacity-80 text-5xl">Our</span>
          <span className="opacity-100 text-5xl"> Trending Books</span>
        </span>
      </h1>
      <div className="flex flex-wrap justify-evenly items-center gap-y-10 w-full">
        {data?.data?.slice(0, 10)?.map((card, index) => (
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
                <div className="ml-auto">
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
      </div>
      <div className="flex flex-wrap justify-center items-center py-10 w-full">
        <button
          onClick={() => {
            navigate("/allBooks");
          }}
          className="learn-more"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Hero;

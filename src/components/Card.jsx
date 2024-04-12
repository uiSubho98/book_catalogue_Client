import React from "react";
import { motion } from "framer-motion";

export function Card({ imageSrc, author, date, price, genre, title }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 10 }}
      className="max-w-sm mx-auto rounded overflow-hidden shadow-lg m-4 bg-white"
    >
      <img className="w-full h-64 object-cover" src={imageSrc} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{author}</p>
        <p className="text-gray-700 text-base">{date}</p>
        <p className="text-gray-700 text-base">{price}</p>
        <p className="text-gray-700 text-base">{genre}</p>
      </div>
    </motion.div>
  );
}

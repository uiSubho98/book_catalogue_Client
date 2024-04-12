import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const Menu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-neutral-300  shadow-input backdrop-blur-lg backdrop-filter flex justify-center space-x-4 px-6 py-6 "
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({ children, to, ...rest }) => {
  return (
    <Link to={to} {...rest} className="text-neutral-200 hover:text-white">
      {children}
    </Link>
  );
};

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wishlist from "./components/Wishlist";
import { NavbarDemo } from "./components/Navbar";
import SignIn from "./components/SignIn";
import PrivateRoute from "./utils/PrivateRoute";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "./Redux/features/AuthSlice";
import AllBooks from "./pages/AllBooks";
import AddBooks from "./pages/AddBooks";

function App() {
  const dispatch = useDispatch();
  if (localStorage.getItem("token")) {
    dispatch(setToken(localStorage.getItem("token")));
    if (localStorage.getItem("user")) {
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    }
  } else {
    dispatch(setToken(null));
  }
  // localStorage as a dependency array
  return (
    <>
      <NavbarDemo />
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/wishlist"
          element={<PrivateRoute element={<Wishlist />} />}
        />
        <Route
          path="/allBooks"
          element={<PrivateRoute element={<AllBooks />} />}
        />
        <Route
          path="/addBooks"
          element={<PrivateRoute element={<AddBooks />} />}
        />
        <Route path="/auth" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;

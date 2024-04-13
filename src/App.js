import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import { NavbarDemo } from "./components/Navbar";
import SignIn from "./components/SignIn";
import PrivateRoute from "./utils/PrivateRoute";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "./Redux/features/AuthSlice";
import AllBooks from "./pages/AllBooks";
import AddBooks from "./pages/AddBooks";
import EditBooks from "./pages/EditBooks";
import { useBooksQuery, useLazyBooksQuery } from "./Redux/features/BooksSlice";
import MultiStepLoaderDemo from "./components/Loading";

function App() {
  const dispatch = useDispatch();
  const [getUserData, { data, error, isLoading }] = useLazyBooksQuery(1);
  // localStorage as a dependency array

  useEffect(() => {
    console.log("1111111");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userJSON = localStorage.getItem("user");
        const user = userJSON ? JSON.parse(userJSON) : null;

        if (token) {
          const res = await getUserData();
          // console.log({res});
          dispatch(setToken(token));
          if (user) {
            dispatch(setUser(user));
          }
        } else {
          dispatch(setToken(null));
        }

        // Log the result if fetched
        // console.log("Fetched data:", data);
        // console.log(" data:", error);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array since dispatch doesn't change

  if (isLoading) {
    return <MultiStepLoaderDemo loading={isLoading} />;
  }
  return (
    !isLoading && (
      <>
        <NavbarDemo />
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route
            path="/editBooks"
            element={<PrivateRoute element={<EditBooks />} />}
          />
          <Route path="/auth" element={<SignIn />} />
        </Routes>
      </>
    )
  );
}

export default App;

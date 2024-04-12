import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  return token ? element : <Navigate to="/auth" replace />;
};

export default PrivateRoute;

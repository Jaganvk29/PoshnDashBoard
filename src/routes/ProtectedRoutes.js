import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const ProtectedRoutes = () => {
  const { isLogged } = useContext(AuthContext);

  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

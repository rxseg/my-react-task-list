import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function RutaProtegida({ isAllowed, children, redirectTo = "/" }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
}

export default RutaProtegida;

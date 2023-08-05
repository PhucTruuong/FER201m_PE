import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
export default function Protected({ children }) {
  const { user } = UserAuth();
  if (!user.email) {
    return (
      <Navigate to="/signin" state={{ EM: "Restricted page. Please log in" }} />
    );
  }
  return children;
}

import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <button onClick={handleLogout} style={{ color: "white" }}>
      Log Out
    </button>
  );
};

export default Logout;
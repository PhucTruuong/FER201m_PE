import { useContext, createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  // const initialUserState = {
  //   name: "",
  //   avatar: "",
  //   email: ""
  // }
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
    }
  }, []);

  const decodeJWT = (response) => {
    // console.log("Encoded JWT ID token: " + response.credential);
    localStorage.setItem("jwtToken", response.credential);
    var decoded = jwt_decode(response.credential);
    setUser(decoded);
  };

  const loginWithPassword = (response) => {
    const {email} = response;
    setUser((user) => ({ ...user, email: email}));
  }

  const logOut = () => {
    localStorage.removeItem("jwtToken");
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ user, decodeJWT, loginWithPassword, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

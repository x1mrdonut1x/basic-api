import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const location = useLocation();
  const [authState, setAuthState] = useState("initial");
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, [location]);

  const getUser = () => {
    const accessToken = localStorage.getItem("accessToken");
    fetch("http://localhost:4000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + accessToken
      }
    })
      .then(response => {
        if (response.status === 200) {
          setAuthState("authorized");
          return response.json();
        } else {
          setAuthState("unauthorized");
          throw new Error("Unauthorized");
        }
      })
      .then(json => setUser(json))
      .catch(e => e);
  };

  const { children } = props;

  return (
    <AuthContext.Provider value={{ authState, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };

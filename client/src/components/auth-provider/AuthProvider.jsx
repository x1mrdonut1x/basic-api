import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const location = useLocation();
  const [authState, setAuthState] = useState("unauthorized");
  //   const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    console.log(location);
    console.log((location.state || {}).accessToken);
    getUser();
  }, [location]);

  const getUser = () => {
    fetch("http://localhost:4000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + (location.state || {}).accessToken
      }
    })
      .then(response => {
        if (response.status === 200) {
          setAuthState("authorized");
          console.log(response.status);
        }
      })
      .catch(e => console.log(e));
  };

  const { children } = props;

  return (
    <AuthContext.Provider value={{ authState }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };

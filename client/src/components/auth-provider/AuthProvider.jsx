import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { userService } from "_services/user.services";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const location = useLocation();
  const [authState, setAuthState] = useState("initial");
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, [location]);

  const getUser = () => {
    userService
      .getSelf()
      .then(json => {
        setAuthState("authorized");
        setUser(json);
      })
      .catch(e => {
        setAuthState("unauthorized");
        setUser({});
      });
  };

  const { children } = props;

  return (
    <AuthContext.Provider value={{ authState, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };

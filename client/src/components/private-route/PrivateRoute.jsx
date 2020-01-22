import React, { useContext, useState } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

import { AuthContext } from "../auth-provider/AuthProvider";

function PrivateRoute(props) {
  const state = useContext(AuthContext);
  console.log(state);
  const [authState, setAuthState] = useState("unauthorized");

  console.log(authState);

  if (authState === "authorized") {
    return <Route {...props} />;
  } else {
    return <Redirect to="/auth" />;
  }
}

export default PrivateRoute;

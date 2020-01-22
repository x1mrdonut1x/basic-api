import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { AuthContext } from "../auth-provider/AuthProvider";

function PrivateRoute(props) {
  const { authState } = useContext(AuthContext);

  if (authState === "initial") {
    return <div>loading</div>;
  } else if (authState === "authorized") {
    return <Route {...props} />;
  } else {
    return <Redirect to="/auth" />;
  }
}

export default PrivateRoute;

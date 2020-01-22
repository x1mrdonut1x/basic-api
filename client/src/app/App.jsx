import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import Auth from "pages/auth/Auth";
import { AuthProvider } from "components/auth-provider/AuthProvider";
import PrivateRoute from "components/private-route/PrivateRoute";
import Products from "pages/products/Products";
import React from "react";
import User from "pages/user/User";

function App() {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <Redirect exact from="/" to="/user" />
          <PrivateRoute path={"/user"} component={User} />
          <Route path="/auth" component={Auth} />
          <Route path="/products" component={Products} />
        </AuthProvider>
      </Switch>
    </Router>
  );
}

export default App;

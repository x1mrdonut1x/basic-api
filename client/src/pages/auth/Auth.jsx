import { Card, Col, Row } from "antd";
import { Redirect, Route, Switch } from "react-router-dom";

import Login from "./parts/Login";
import React from "react";
import Register from "./parts/Register";
import styles from "./Auth.style";
import withStyles from "react-jss";

function Auth({ classes }) {
  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      className={classes.wrapper}
    >
      <Col>
        <Card>
          <Switch>
            <Redirect exact from="/auth" to="/auth/login" />
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/register" component={Register} />
          </Switch>
        </Card>
      </Col>
    </Row>
  );
}

export default withStyles(styles)(Auth);

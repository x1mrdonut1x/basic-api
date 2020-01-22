import { Button, Col, Divider, Input, Row } from "antd";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";

import Spacer from "components/spacer/Spacer";
import { userService } from "_services/user.services";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();

  const handleLogin = () => {
    userService
      .login(email, password)
      .then(() => {
        history.push("/user");
      })
      .catch(e => console.log(e));
  };

  return (
    <Row type="flex" align="middle" justify="center">
      <Col span={16}>
        <Row type="flex" align="middle" justify="center">
          <Spacer />
          <Col span={24}>
            <Input
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            ></Input>
          </Col>
          <Spacer />
          <Col span={24}>
            <Input
              placeholder="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            ></Input>
          </Col>
          <Spacer />
          <Spacer />
          <Col>
            <Button onClick={handleLogin} type="primary">
              Login
            </Button>
          </Col>
          <Spacer />
          <Divider>or</Divider>
          <Spacer />
          <Col>
            <Link to="/auth/register" type="primary">
              Sign Up
            </Link>
          </Col>
          <Spacer />
        </Row>
      </Col>
    </Row>
  );
}

export default Login;

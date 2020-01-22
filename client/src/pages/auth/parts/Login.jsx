import { Button, Col, Divider, Input, Row } from "antd";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";

import Spacer from "components/spacer/Spacer";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();

  const handleLogin = () => {
    fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
          
        // localStorage.setItem('accessToken', JSON.stringify(user));
        history.push("/user", { accessToken: json.accessToken });
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

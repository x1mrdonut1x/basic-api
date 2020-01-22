import { Button, Col, Divider, Input, Row } from "antd";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";

import Spacer from "components/spacer/Spacer";
import { userService } from "_services/user.services";

function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const history = useHistory();

  const handleRegister = () => {
    userService
      .register({ email, password, firstName, lastName })
      .then(() => history.push("/auth/login"));
  };

  return (
    <Row type="flex" align="middle" justify="center">
      <Col span={16}>
        <Row type="flex" align="middle" justify="space-between">
          <Spacer />
          <Col span={11}>
            <Input
              placeholder="First Name"
              onChange={e => setFirstName(e.target.value)}
            />
          </Col>
          <Col span={11}>
            <Input
              placeholder="Last Name"
              onChange={e => setLastName(e.target.value)}
            />
          </Col>
          <Spacer />
          <Col span={24}>
            <Input
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
          </Col>
          <Spacer />
          <Col span={24}>
            <Input
              placeholder="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </Col>
          <Spacer />
          <Spacer />
          <Col span={24}>
            <Row type="flex" justify="center">
              <Col>
                <Button onClick={handleRegister} type="primary">
                  Register
                </Button>
              </Col>
            </Row>
          </Col>
          <Spacer />
          <Divider>or</Divider>
          <Spacer />
          <Col span={24}>
            <Row type="flex" justify="center">
              <Col>
                <Link to="/auth/login" type="primary">
                  Login
                </Link>
              </Col>
            </Row>
          </Col>
          <Spacer />
        </Row>
      </Col>
    </Row>
  );
}

export default Register;

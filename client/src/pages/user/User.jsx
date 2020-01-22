import { Button, Card, Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "components/auth-provider/AuthProvider";
import Spacer from "components/spacer/Spacer";
import styles from "./User.style";
import { useHistory } from "react-router-dom";
import withStyles from "react-jss";

function User({ classes }) {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    getBasket();
  }, [history]);

  const logOut = () => {
    localStorage.removeItem("accessToken");
    history.replace("/auth/login");
  };
  
  const getBasket = () => {
    const accessToken = localStorage.getItem("accessToken");
    fetch("http://localhost:4000/user/basket", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + accessToken
      }
    })
      .then(response => response.json())
      .then(json => setBasket(json));
  };
  
  return (
    <Row type="flex" justify="center" align="middle">
      <Col>
        <Card
          className={classes.card}
          title={`${user.firstName} ${user.lastName}`}
          extra={<Button onClick={logOut}>Log out</Button>}
        >
          Basket:
          <Spacer />
          <Row type="flex" align="middle" justify="space-around">
            {basket.map((product, index) => (
              <Col key={index}>
                <Card>
                  {`${product.name}`}
                  <br />
                  <span>{`${product.price}$`}</span>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default withStyles(styles)(User);

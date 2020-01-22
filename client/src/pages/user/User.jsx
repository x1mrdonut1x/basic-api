import { Button, Card, Col, Icon, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "components/auth-provider/AuthProvider";
import ProductCard from "components/product-card/ProductCard";
import Products from "pages/products/Products";
import Spacer from "components/spacer/Spacer";
import styles from "./User.style";
import { useHistory } from "react-router-dom";
import { userService } from "_services/user.services";
import withStyles from "react-jss";

function User({ classes }) {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [basket, setBasket] = useState([]);
  const [addProductsVisible, setAddProductsVisible] = useState(false);

  useEffect(() => {
    getBasket();
  }, [history]);

  const logOut = () => {
    userService.logout().then(() => history.replace("/auth/login"));
  };

  const getBasket = () => {
    userService.getBasket().then(data => setBasket(data));
  };

  const handleRemove = product => {
    userService.removeFromBasket(product.id).then(() => {
      getBasket();
    });
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      className={classes.wrapper}
    >
      {addProductsVisible ? (
        <Products
          onChange={getBasket}
          onClose={() => setAddProductsVisible(false)}
        />
      ) : null}
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
                <ProductCard onClick={handleRemove} data={product} />
                <Spacer />
              </Col>
            ))}
            <Col>
              <Card
                className={classes.addProductCard}
                onClick={() => setAddProductsVisible(true)}
              >
                <Icon type="plus" className={classes.addProductIcon} />
              </Card>
              <Spacer />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default withStyles(styles)(User);

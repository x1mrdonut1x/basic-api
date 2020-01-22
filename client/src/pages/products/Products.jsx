import { Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";

import ProductCard from "components/product-card/ProductCard";
import Spacer from "components/spacer/Spacer";
import styles from "./Products.style";
import { useHistory } from "react-router-dom";
import { userService } from "_services/user.services";
import withStyles from "react-jss";

function Products({ onClose, onChange }) {
  const history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [history]);

  const getProducts = () => {
    userService.getProducts().then(data => setProducts(data));
  };

  const handleAdd = productId => {
    userService.addToBasket(productId).then(() => {
      onChange();
      onClose();
    });
  };

  return (
    <Modal
      footer={null}
      visible
      title="Add products to basket:"
      onCancel={onClose}
      onOk={onClose}
    >
      <Spacer />
      <Row type="flex" align="middle" justify="space-around">
        {products.map((product, index) => (
          <Col key={index}>
            <ProductCard
              onClick={product => handleAdd(product.id)}
              data={product}
            />
          </Col>
        ))}
      </Row>
    </Modal>
  );
}

export default withStyles(styles)(Products);

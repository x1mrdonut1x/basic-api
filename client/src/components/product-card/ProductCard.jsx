import { Card } from "antd";
import React from "react";
import styles from "./ProductCard.style";
import withStyles from "react-jss";

function ProductCard(props) {
  const { data, onClick, classes } = props;
  const { name, price } = data;
  return (
    <Card
      className={onClick ? classes.hover : classes.card}
      onClick={onClick ? () => onClick(data) : null}
    >
      {`${name}`}
      <br />
      <span>{`${price}$`}</span>
    </Card>
  );
}

export default withStyles(styles)(ProductCard);

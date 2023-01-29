import { memo } from "react";
import "./Product.css";
const Product = memo((product) => {
  const { category, createdAt, description, id, price, title, image } = product;
  const getDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (mm < 10) {
      mm = `0${mm}`;
    }
    if (dd < 10) {
      dd = `0${dd}`;
    }

    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    const time = `${hours}:${minutes}`;
    return `${yyyy}-${mm}-${dd} ${time}`;
  };
  
  return (
    <div className="product">
      <img src={image} alt="id" />
      <div className="product__info">
        <h3>{title}</h3>
        <h6>{category}</h6>
        <p className="description">{description}</p>
        <h5>{getDate(new Date(createdAt))}</h5>
      </div>
      <span>{`Rs ${price}`}</span>
    </div>
  );
});

export default Product;

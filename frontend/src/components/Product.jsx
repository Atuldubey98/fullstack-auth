import { faMinus, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { CART_ADD, CART_REMOVE } from "../reducers/cartReducer";
import "./Product.css";
const Product = memo((product) => {
  const { category, createdAt, id, price, title, image } = product;
  let { rating } = product;
  if (!rating || !("rate" in rating)) {
    rating = { rate: 0 };
  }
  const { state, cartDispatch } = useContext(CartContext);
  const { cartProducts } = state;
  const cartProds = cartProducts.filter((product) => product.id === id);

  const cartProd = cartProds.length > 0 ? cartProds[0] : { quantity: 0 };
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
  const addToBasket = () => {
    cartDispatch({ type: CART_ADD, payload: { ...product, quantity: 1 } });
  };
  const removeFromBasket = () => {
    cartDispatch({ type: CART_REMOVE, payload: { ...product } });
  };
  const Stars = () => {
    let { rate } = rating;
    rate = parseInt(rate);
    return Array.from(Array(rate)).map((r) => (
      <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
    ));
  };
  return (
    <div className="product">
      <div
        style={{ display: cartProd.quantity > 0 && "inline" }}
        className="product__btns"
      >
        <button onClick={addToBasket}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <span>{cartProd.quantity}</span>
        <button onClick={removeFromBasket}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
      <img src={image} alt="id" />
      <div className="product__info">
        <h3>{title}</h3>
        <p>{category}</p>
        <h5>{getDate(new Date(createdAt))}</h5>
        <span>{`Rs ${price}`}</span>
      </div>
      <div className="product__ratings">
        <Stars />
      </div>
    </div>
  );
});

export default Product;

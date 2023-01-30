import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { CART_ADD, CART_REMOVE } from "../reducers/cartReducer";
import "./CartProduct.css";
const CartProduct = (product) => {
  const { cartDispatch } = useContext(CartContext);

  const { category, price, title, quantity } = product;
  const addToBasket = () => {
    cartDispatch({ type: CART_ADD, payload: { ...product, quantity: 1 } });
  };
  const removeFromBasket = () => {
    cartDispatch({ type: CART_REMOVE, payload: { ...product } });
  };
  return (
    <div className="cart__product">
      <h4>{title}</h4>
      <p>{category}</p>
      <div className="cart__btns">
        <button onClick={addToBasket} className="add">
          ADD
        </button>
        <span>{`${quantity} X ${price}`}</span>
        <button onClick={removeFromBasket} className="remove">
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default CartProduct;

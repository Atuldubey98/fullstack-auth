import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import CartProduct from "./CartProduct";
import store from "../assets/store.jpg";
import "./CartProducts.css";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
const CartProducts = () => {
  const { state } = useContext(CartContext);
  const { cartProducts } = state;
  const totalPrice = cartProducts.reduce(
    (sum, value) => sum + value.price * value.quantity,
    0
  );
  const navigate = useNavigate();
  return (
    <div className="cart__products">
      <h2>
        Cart <span>{`(${cartProducts.length} Items)`}</span>
      </h2>

      <div className="cart__items">
        {cartProducts.map((product) => (
          <CartProduct {...product} key={product.id} />
        ))}
        {cartProducts.length <= 0 && (
          <div className="cart__null">
            <div className="cart__zero">
              <span>Cart Empty</span>
              <img src={store} alt="noproducts" className="noprod" />
            </div>
          </div>
        )}
      </div>
      {totalPrice !== 0 && (
        <div className="cart__total">
          <span>{`Rs ${totalPrice}`}</span>
          <button onClick={() => navigate("/placeorder")}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default CartProducts;

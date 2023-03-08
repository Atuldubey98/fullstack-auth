import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import store from "../assets/store.jpg";
import { CartContext } from "../contexts/CartContext";
import CartProduct from "./CartProduct";
import "./CartProducts.css";
import useMessage from "../hooks/useMessage";
import ErrorMessage from "./ErrorMessage";
const CartProducts = () => {
  const { state } = useContext(CartContext);
  const { cartProducts } = state;
  const [message, onMessageSet] = useMessage();
  const totalPrice = cartProducts.reduce(
    (sum, value) => sum + value.price * value.quantity,
    0
  );
  const navigate = useNavigate();
  const onNavigateToPlaceOrder = () => {
    if (totalPrice < 100) {
      onMessageSet({ message: "Add price greater than 100", isError: true });
    } else {
      navigate("/placeorder");
    }
  };
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
              <span
                style={{
                  color: "black",
                }}
              >
                Cart Empty
              </span>
              <img src={store} alt="noproducts" className="noprod" />
            </div>
          </div>
        )}
      </div>
      {totalPrice !== 0 && (
        <div className="cart__total">
          <span>{`Rs ${totalPrice.toFixed(2)}`}</span>
          <button onClick={onNavigateToPlaceOrder}>Place Order</button>
        </div>
      )}
      {message.message.length > 0 && <ErrorMessage {...message} />}
    </div>
  );
};

export default CartProducts;

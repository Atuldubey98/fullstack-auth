import { useEffect } from "react";
import "./Payment.css";
import { Elements } from "@stripe/react-stripe-js";
import { useContext } from "react";
import OrderService from "../api/OrderService";
import { OrderContext } from "../contexts/OrderContext";
import {
  CLIENT_SECRET_ERROR,
  CLIENT_SECRET_LOADED,
  CLIENT_SECRET_LOADING,
  STRIPE_PROMISE_ERROR,
  STRIPE_PROMISE_LOADED,
  STRIPE_PROMISE_LOADING,
} from "../reducers/orderReducer";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../contexts/CartContext";
function Payment() {
  const { state, orderDispatch } = useContext(OrderContext);
  const { data: stripePromise } = state.stripePromise;
  const { data: clientSecret } = state.clientSecret;
  const { state: cartState } = useContext(CartContext);
  const { cartProducts } = cartState;
  useEffect(() => {
    if (!stripePromise) {
      (async () => {
        try {
          orderDispatch({ type: STRIPE_PROMISE_LOADING });
          const { publishableKey } = await OrderService.getPublishableKey();
          const payload = await loadStripe(publishableKey);
          orderDispatch({
            type: STRIPE_PROMISE_LOADED,
            payload,
          });
        } catch (error) {
          orderDispatch({
            type: STRIPE_PROMISE_ERROR,
            payload: `Payment Error !`,
          });
        }
      })();
    }
  }, [stripePromise]);
  useEffect(() => {
    if (!clientSecret) {
      try {
        (async () => {
          orderDispatch({ type: CLIENT_SECRET_LOADING });
          const data = await OrderService.getPaymentIntent(cartProducts);
          orderDispatch({
            type: CLIENT_SECRET_LOADED,
            payload: data.clientSecret,
          });
        })();
      } catch (error) {
        orderDispatch({ type: CLIENT_SECRET_ERROR, payload: "Payment Error" });
      }
    }
  }, [clientSecret]);
  return (
    <div className="payment__wrapper">
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;

import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect } from "react";
import OrderService from "../api/OrderService";
import AddressForm from "../components/AddressForm";
import CartProducts from "../components/CartProducts";
import Header from "../components/Header";
import Payment from "../components/Payment";
import { OrderContext } from "../contexts/OrderContext";
import { UIContext } from "../contexts/UIContext";
import {
  STRIPE_PROMISE_ERROR,
  STRIPE_PROMISE_LOADED,
  STRIPE_PROMISE_LOADING,
} from "../reducers/orderReducer";
import PageLayout from "./PageLayout";
import "./PlaceOrder.css";
const PlaceOrder = () => {
  const { sideCart, orderFormIndex } = useContext(UIContext);
  const formChildren = [<AddressForm />, <Payment />];
  const { orderDispatch } = useContext(OrderContext);

  useEffect(() => {
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
        console.log(error);
        orderDispatch({
          type: STRIPE_PROMISE_ERROR,
          payload: `Payment Error !`,
        });
      }
    })();
  }, []);
  return (
    <PageLayout>
      <Header />
      <div className="cart__wrapper">
        <div className="order__form">{formChildren[orderFormIndex]}</div>
        {sideCart && <CartProducts />}
      </div>
    </PageLayout>
  );
};

export default PlaceOrder;

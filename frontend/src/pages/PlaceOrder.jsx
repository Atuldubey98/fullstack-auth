import React, { useContext } from "react";
import AddressForm from "../components/AddressForm";
import CartProducts from "../components/CartProducts";
import Header from "../components/Header";
import Payment from "../components/Payment";
import { UIContext } from "../contexts/UIContext";
import PageLayout from "./PageLayout";
import "./PlaceOrder.css";
const PlaceOrder = () => {
  const { sideCart, orderFormIndex } = useContext(UIContext);
  const formChildren = [<AddressForm />, <Payment />];
  
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

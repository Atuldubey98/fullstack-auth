import React, { useContext } from "react";
import AddressForm from "../components/AddressForm";
import Payment from "../components/Payment";
import { UIContext } from "../contexts/UIContext";
import "./PlaceOrder.css";
const PlaceOrder = () => {
  const { orderFormIndex } = useContext(UIContext);
  const formChildren = [<AddressForm />, <Payment />];
  return (
    <div className="place__order">
      <div className="order__form">{formChildren[orderFormIndex]}</div>
    </div>
  );
};

export default PlaceOrder;

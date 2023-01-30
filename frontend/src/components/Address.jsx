import React from "react";
import { useContext } from "react";
import { OrderContext } from "../contexts/OrderContext";
import { ADDRESS_SELECT } from "../reducers/orderReducer";
import "./Address.css";
const Address = (address) => {
  const { state, orderDispatch } = useContext(OrderContext);
  const { block, area, pincode, landmark, city, id } = address;
  const onChange = () => {
    orderDispatch({ type: ADDRESS_SELECT, payload: id });
  };
  return (
    <div
      style={{
        backgroundColor: state.selectedAddress === id && "lightgray",
      }}
      className="address"
      onClick={onChange}
    >
      <input
        type="radio"
        className="current"
        name="current"
        checked={state.selectedAddress === id}
        onChange={onChange}
      />
      <div className="address__current">
        <p>{block}</p>
        <span>
          {area} {pincode}
        </span>
        <p>{landmark}</p>
        <span>{city}</span>
      </div>
    </div>
  );
};

export default Address;

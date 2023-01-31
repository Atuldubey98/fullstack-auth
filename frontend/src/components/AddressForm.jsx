import React, { useContext, useEffect } from "react";
import OrderService from "../api/OrderService";
import { CartContext } from "../contexts/CartContext";
import { OrderContext } from "../contexts/OrderContext";
import { UIContext } from "../contexts/UIContext";
import {
  ADDRESS_ADD,
  ADDRESS_ERROR,
  ADDRESS_LOADED,
  ADDRESS_LOADING,
  ON_ADDRESS_CHANGE,
} from "../reducers/orderReducer";
import Address from "./Address";
import "./AddressForm.css";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
const AddressForm = () => {
  const { state, orderDispatch } = useContext(OrderContext);
  const { onOrderFormIndexChange } = useContext(UIContext);
  const { state: cartState } = useContext(CartContext);

  const { addresses, loading, error } = state;
  const addAddress = async (e) => {
    try {
      e.preventDefault();
      const { address } = await OrderService.addAddressAPI(state.address);
      orderDispatch({ type: ADDRESS_ADD, payload: address });
    } catch (error) {
      console.log(error);
    }
  };
  const onAddressChange = (e) => {
    const { name, value } = e.target;
    orderDispatch({ type: ON_ADDRESS_CHANGE, payload: { name, value } });
  };
  const onAddressSubmit = (e) => {
    e.preventDefault();
    if (cartState.cartProducts.length <= 0) {
      orderDispatch({
        type: ADDRESS_ERROR,
        payload: `Put some items in basket`,
      });
      setTimeout(() => {
        orderDispatch({
          type: ADDRESS_ERROR,
          payload: ``,
        });
      }, 2000);
      return;
    }
    onOrderFormIndexChange(1);
  };
  useEffect(() => {
    orderDispatch({ type: ADDRESS_LOADING });
    (async () => {
      try {
        const { addresses } = await OrderService.getAllAddress();
        orderDispatch({ type: ADDRESS_LOADED, payload: addresses });
      } catch (error) {
        orderDispatch({ type: ADDRESS_ERROR, payload: `Error occured !` });
      }
    })();
  }, []);
  return (
    <div className="address__form">
      <div className="addresses">
        <form onSubmit={onAddressSubmit}>
          <label htmlFor="current">Select Address to Deliver :</label>
          {loading ? (
            <Loading />
          ) : (
            <div className="address__list">
              {addresses.map((address) => (
                <Address {...address} key={address.id} />
              ))}
            </div>
          )}
          <button type="submit" disabled={state.selectedAddress === 0}>
            {state.selectedAddress === 0 ? "Select Address" : "Submit"}
          </button>
        </form>
        {error && <ErrorMessage error={error} />}
      </div>
      <form onSubmit={addAddress}>
        <div className="input__control">
          <label htmlFor="block">Block :</label>
          <input
            type="text"
            name="block"
            onChange={onAddressChange}
            value={state.address.block}
          />
        </div>
        <div className="input__control">
          <label htmlFor="area">Area :</label>
          <input
            type="text"
            name="area"
            onChange={onAddressChange}
            value={state.address.area}
          />
        </div>
        <div className="input__control">
          <label htmlFor="pincode">Pin-Code :</label>
          <input
            type="number"
            name="pincode"
            onChange={onAddressChange}
            value={state.address.pincode}
          />
        </div>
        <div className="input__control">
          <label htmlFor="city">City :</label>
          <input
            type="text"
            name="city"
            onChange={onAddressChange}
            value={state.address.city}
          />
        </div>
        {loading ? <Loading /> : <button type="submit">Add New Address</button>}
      </form>
    </div>
  );
};

export default AddressForm;

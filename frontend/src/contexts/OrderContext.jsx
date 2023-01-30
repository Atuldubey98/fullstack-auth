import { createContext, useReducer } from "react";
import { orderIntial, orderReducer } from "../reducers/orderReducer";

export const OrderContext = createContext();
export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, orderIntial);
  return (
    <OrderContext.Provider value={{ state, orderDispatch: dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

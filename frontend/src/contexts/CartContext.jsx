import { createContext, useReducer } from "react";
import { cartReducer, initialCart } from "../reducers/cartReducer";

export const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCart);
  return (
    <CartContext.Provider value={{ state, cartDispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

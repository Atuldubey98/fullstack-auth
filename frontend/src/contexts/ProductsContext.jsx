import { createContext, useReducer } from "react";
import {
  productReducer,
  productsInitialState,
} from "../reducers/productReducer";

export const ProductContext = createContext();

export const ProductContextProivder = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, productsInitialState);
  return (
    <ProductContext.Provider value={{ state, productDispatch: dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

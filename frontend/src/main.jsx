import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { CartContextProvider } from "./contexts/CartContext";
import { OrderContextProvider } from "./contexts/OrderContext";
import { ProductContextProivder } from "./contexts/ProductsContext";
import { UIContextProvider } from "./contexts/UIContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <OrderContextProvider>
      <CartContextProvider>
        <UIContextProvider>
          <AuthContextProvider>
            <ProductContextProivder>
              <App />
            </ProductContextProivder>
          </AuthContextProvider>
        </UIContextProvider>
      </CartContextProvider>
    </OrderContextProvider>
  </BrowserRouter>
);

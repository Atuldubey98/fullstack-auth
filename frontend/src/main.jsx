import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ProductContextProivder } from "./contexts/ProductsContext";
import { UIContextProvider } from "./contexts/UIContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UIContextProvider>
        <AuthContextProvider>
          <ProductContextProivder>
            <App />
          </ProductContextProivder>
        </AuthContextProvider>
      </UIContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

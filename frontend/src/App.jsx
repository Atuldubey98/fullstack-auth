import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";
import { UIContext } from "./contexts/UIContext";
import AddProductsPage from "./pages/AddProductsPage";
import Completion from "./pages/Completion";
import { LandingPage } from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import PlaceOrder from "./pages/PlaceOrder";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const { theme } = useContext(UIContext);
  return (
    <div className={theme.isDark ? "dark" : "white"}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <LandingPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <AddProductsPage />
            </PrivateRoute>
          }
          errorElement={<Navigate to={"/login"} replace />}
        >
          <Route
            path=":page"
            element={
              <PrivateRoute>
                <AddProductsPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/placeorder"
          element={
            <PrivateRoute>
              <PlaceOrder />
            </PrivateRoute>
          }
        />
        <Route
          path="/completion"
          element={
            <PrivateRoute>
              <Completion />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

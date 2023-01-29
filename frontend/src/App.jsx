import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";
import { UIContext } from "./contexts/UIContext";
import AddProductsPage from "./pages/AddProductsPage";
import { LandingPage } from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

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
      </Routes>
    </div>
  );
};

export default App;

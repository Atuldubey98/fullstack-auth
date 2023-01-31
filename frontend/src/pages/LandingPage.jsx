import React, { useContext } from "react";
import CartProducts from "../components/CartProducts";
import CategoryCards from "../components/CategoryCards";
import Header from "../components/Header";
import { UIContext } from "../contexts/UIContext";
import "./LandingPage.css";
import PageLayout from "./PageLayout";
export const LandingPage = () => {
  const { sideCart } = useContext(UIContext);
  
  return (
    <div style={{ minHeight: "100vh" }}>
      <PageLayout>
        <Header />
        <div className="landing__wrapper">
          <div className="landing__bg">
            <div className="background-container">
              <span>Sale 10% off </span>
            </div>
            <CategoryCards />
          </div>
          {sideCart && <CartProducts />}
        </div>
      </PageLayout>
    </div>
  );
};

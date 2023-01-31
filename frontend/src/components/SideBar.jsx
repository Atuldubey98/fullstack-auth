import React, { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { UIContext } from "../contexts/UIContext";
import Button from "./Button";
import "./SideBar.css";
const SideBar = () => {
  const { sideBar } = useContext(UIContext);
  const logout = {
    text: "Logout",
    style: {
      backgroundColor: "black",
      color: "white",
    },
  };

  return (
    <div style={{ display: sideBar ? "inline" : "none" }} className="sidebar">
      <div className="sidebar__head"></div>
      <div className="sidebar__links">
        <Link to={"/"}>Landing</Link>
        <Link to={"/products"}>Products</Link>
        <Link to={"/placeorder"}>Place Order</Link>
        <Button {...logout} />
      </div>
    </div>
  );
};

export default memo(SideBar);

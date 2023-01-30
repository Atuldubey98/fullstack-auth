import React, { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { UIContext } from "../contexts/UIContext";
import Button from "./Button";
import "./SideBar.css";
const SideBar = () => {
  const { sideBar, openModal } = useContext(UIContext);
  const logout = {
    text: "Logout",
    style: {
      backgroundColor: "black",
      color: "white",
    },
  };
  const addProduct = {
    text: "Add Product",
    onClick: openModal,
    style: {
      backgroundColor: "green",
      color: "white",
    },
  };
  return (
    <div style={{ display: sideBar ? "inline" : "none" }} className="sidebar">
      <div className="sidebar__head"></div>
      <div className="sidebar__links">
        <Link to={"/"}>Landing</Link>
        <Link to={"/products"}>Products</Link>
        <Button {...logout} />
        <Button {...addProduct} />
      </div>
    </div>
  );
};

export default memo(SideBar);

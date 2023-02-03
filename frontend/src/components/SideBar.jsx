import React, { memo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UIContext } from "../contexts/UIContext";
import Button from "./Button";
import UserService from "../api/UserService";
import "./SideBar.css";
const SideBar = () => {
  const { sideBar } = useContext(UIContext);
  const navigate = useNavigate();
  const logout = {
    text: "Logout",
    onClick: async function () {
      try {
        const { status } = await UserService.logout();
        if (status) {
          localStorage.clear();
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    },
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

import {
  faLeftLong,
  faMoon,
  faRightLong,
  faCartShopping,
  faShirt,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { UIContext } from "../contexts/UIContext";
import "./Header.css";
const Header = () => {
  const { onSideBarToggle, sideBar, theme, toggleTheme, onSideCartToggle } =
    useContext(UIContext);
  const { state } = useContext(CartContext);
  const { cartProducts } = state;
  return (
    <header>
      <div className="header__img">
        <FontAwesomeIcon
          icon={sideBar ? faLeftLong : faRightLong}
          onClick={onSideBarToggle}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="header__buttons">
        <Link className="header__button" to={"/products"}>
          <div>
            <FontAwesomeIcon icon={faShirt} />
            Products
          </div>
        </Link>
        <div onClick={onSideCartToggle} className="header__button">
          <FontAwesomeIcon icon={faCartShopping} />
          <span>Cart</span>
          <span className="cart__count">{cartProducts.length}</span>
        </div>
      </div>
      <div className="header__buttons">
        <div className="header__button">
          <FontAwesomeIcon
            style={{ fontSize: "1.3rem", cursor: "pointer" }}
            color={theme.isDark ? "white" : "yellow"}
            icon={theme.isDark ? faMoon : faSun}
            onClick={toggleTheme}
          />
        </div>
      </div>
    </header>
  );
};

export default memo(Header);

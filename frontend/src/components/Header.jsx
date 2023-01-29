import {
  faLeftLong,
  faMoon,
  faRightLong,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { UIContext } from "../contexts/UIContext";
import "./Header.css";
const Header = () => {
  const { onSideBarToggle, sideBar, theme, toggleTheme } =
    useContext(UIContext);
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
        <Link to={"/"}>Users</Link>
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

import React from "react";
import SideBar from "../components/SideBar";
import './PageLayout.css'
const PageLayout = ({ children }) => {
  return (
    <div className="page__layout">
      <SideBar />
      <div className="page__layoutBody">{children}</div>
    </div>
  );
};

export default PageLayout;

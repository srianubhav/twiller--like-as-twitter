import React from "react";
import { useLocation } from "react-router-dom";
import "./Sidebaroption.css";

const SidebarOption = ({ text, Icon, path }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <div className={`sidebarOptions ${isActive ? "sidebarOptions--active" : ""}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
};

export default SidebarOption;

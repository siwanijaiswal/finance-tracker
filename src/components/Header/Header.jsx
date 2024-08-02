import React from "react";
import "./Header.css";

const Header = () => {
  const logoutFunc = () => {
    alert("Logout successfully");
  };

  return (
    <div className="navbar-menu">
      <p className="logo"> Financely </p>
      <p className="logo link" onClick={logoutFunc}>
        Logout
      </p>
    </div>
  );
};

export default Header;

import React from "react";
import "./Button.css";

const Button = ({ children, onClick, blue, ...otherProps }) => {
  return (
    <button
      className={blue ? "btn btn-blue" : "btn"}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;

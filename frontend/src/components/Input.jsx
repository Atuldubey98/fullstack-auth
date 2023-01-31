import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef } from "react";
import "./Input.css";
const Input = forwardRef((searchProps, ref ) => {
  const { icon, label, ...other } = searchProps;
  return (
    <div ref={ref} className="input">
      {label && <label {...label}>{label.name}</label>}
      <input {...other} />
      {icon && <FontAwesomeIcon icon={icon} />}
    </div>
  );
});

export default Input;

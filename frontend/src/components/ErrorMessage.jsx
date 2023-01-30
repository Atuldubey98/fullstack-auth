import React from "react";
import './ErrorMessage.css'
const ErrorMessage = ({ error }) => {
  return (
    <div className="error">
      <span>{error}</span>
    </div>
  );
};

export default ErrorMessage;

import React from "react";
import "./ErrorMessage.css";
const ErrorMessage = (error) => {
  const { message, backgroundColor } = error;
  return (
    <div className="error">
      <span style={{ backgroundColor }}>{message}</span>
    </div>
  );
};

export default ErrorMessage;

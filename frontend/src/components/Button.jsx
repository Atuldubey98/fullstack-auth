import React, { memo } from "react";

const Button = (button) => {
  return <button {...button}>{button.text}</button>;
};

export default memo(Button);

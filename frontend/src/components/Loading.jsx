import React from "react";
import LoadingIndicator from "react-loading-indicator";
const Loading = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="loading__div"
    >
      <LoadingIndicator segmentLength={26} segmentWidth={26} />
    </div>
  );
};

export default Loading;

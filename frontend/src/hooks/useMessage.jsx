import { useState } from "react";

const useMessage = () => {
  const [message, setMessage] = useState({ message: "", backgroundColor: "" });
  function onMessageSet(data) {
    if (!data.isError) {
      setMessage({ message: data.message, backgroundColor: "green" });
    } else {
      setMessage({
        message: data.message,
        backgroundColor: "rgb(236, 54, 54)",
      });
    }
    const time = data.isError ? 2000 : 4000;
    setTimeout(() => {
      setMessage((prev) => {
        return { ...prev, message: "" };
      });
    }, time);
  }
  return [message, onMessageSet];
};

export default useMessage;

import { createContext, useState } from "react";
import { isMobile } from "react-device-detect";
export const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [sideBar, setSideBar] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [sideCart, setSideCart] = useState(false);
  const [orderFormIndex, setOrderFormIndex] = useState(0);
  const onOrderFormIndexChange = (index) => {
    setOrderFormIndex(index);
  };
  const onSideCartToggle = () => {
    setSideCart((p) => !p);
  };
  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem("theme")) {
      return JSON.parse(localStorage.getItem("theme"));
    }
    return { isDark: false };
  });
  const onSideBarToggle = () => {
    setSideBar((s) => !s);
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function toggleTheme() {
    setTheme((prev) => {
      if (prev.isDark) {
        localStorage.setItem(
          "theme",
          JSON.stringify({ ...prev, isDark: false })
        );
        return { ...prev, isDark: false };
      }
      localStorage.setItem("theme", JSON.stringify({ ...prev, isDark: true }));
      return { ...prev, isDark: true };
    });
  }
  return (
    <UIContext.Provider
      value={{
        sideBar,
        modalIsOpen,
        onSideBarToggle,
        openModal,
        closeModal,
        toggleTheme,
        theme,
        sideCart,
        onSideCartToggle,
        orderFormIndex,
        onOrderFormIndexChange,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

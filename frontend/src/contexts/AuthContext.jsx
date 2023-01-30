import axios from "axios";
import jwt_decode from "jwt-decode";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState();
  const [userLoading, setUserLoading] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      return jwt_decode(token);
    }
    return null;
  });
  const logout = async () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  const login = async (email, password) => {
    setUserLoading(true);
    if (!email || !password) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      setUser(jwt_decode(response.data.token));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 2000);
    } finally {
      setUserLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post("http://localhost:3000/user/register", {
        email,
        password,
        name,
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        userLoading,
        error,
        user,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

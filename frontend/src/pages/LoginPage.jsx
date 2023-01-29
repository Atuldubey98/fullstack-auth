import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./Loginpage.css";
const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { login, userLoading } = useContext(AuthContext);
  function onChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      await login(user.email, user.password);
    } catch (e) {
      console.log(error);
    }
  }
  console.log(userLoading);
  return (
    <div className="login__page">
      <form onSubmit={onSubmit}>
        <div className="input__control">
          <label htmlFor="email">Email : </label>
          <input onChange={onChange} type="email" name="email" />
        </div>
        <div className="input__control">
          <label htmlFor="password">Password : </label>
          <input onChange={onChange} type="password" name="password" />
        </div>
        {!userLoading && <button type="submit">Login</button>}
      </form>
    </div>
  );
};

export default LoginPage;

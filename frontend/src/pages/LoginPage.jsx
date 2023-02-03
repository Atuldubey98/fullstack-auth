import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="login__page">
      <form onSubmit={onSubmit}>
        <div className="input__control">
          <label htmlFor="email">Email : </label>
          <input
            onChange={onChange}
            type="email"
            name="email"
            value={user.email}
            autoComplete="off"
            placeholder={user.email.length === 0 ? "Email address" : ""}
          />
        </div>
        <div className="input__control">
          <label htmlFor="password">Password : </label>
          <input
            onChange={onChange}
            type="password"
            name="password"
            value={user.password}
            autoComplete="off"
            placeholder={user.password.length === 0 ? "Password" : ""}
          />
        </div>
        {!userLoading && <button type="submit">Login</button>}
        <Link to={"/register"}>Register Instead ?</Link>
      </form>
    </div>
  );
};

export default LoginPage;

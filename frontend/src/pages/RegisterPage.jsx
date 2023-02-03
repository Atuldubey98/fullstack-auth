import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import { AuthContext } from "../contexts/AuthContext";
import useMessage from "../hooks/useMessage";
import "./RegisterPage.css";
const RegisterPage = () => {
  const [user, setUser] = useState({ email: "", password: "", name: "" });
  const { register, userLoading } = useContext(AuthContext);
  const [message, onMessageSet] = useMessage();
  function onChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const response = await register(user.name, user.email, user.password);
      const data = { message: response.message };
      onMessageSet(data);
    } catch (error) {
      const data = { message: error.response.data.message, isError: true };
      onMessageSet(data);
    }
  }
  return (
    <div className="register__page">
      <form onSubmit={onSubmit}>
        <div className="input__control">
          <label htmlFor="email">Name : </label>
          <input
            onChange={onChange}
            type="name"
            name="name"
            value={user.name}
            autoComplete="off"
            placeholder={user.name.length === 0 ? "Name" : ""}
          />
        </div>
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

        {userLoading ? <Loading /> : <button type="submit">Register</button>}
        {message.message && <ErrorMessage {...message} />}
        <Link to={"/login"}>Already registed ? </Link>
      </form>
    </div>
  );
};

export default RegisterPage;

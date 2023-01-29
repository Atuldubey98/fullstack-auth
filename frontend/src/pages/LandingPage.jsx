import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../api/UserService";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import Header from "../components/Header";
import PageLayout from "./PageLayout";
export const LandingPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const onLogout = async () => {
    await logout();
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await UserService.getAllUsers();
        setUsers(response.users);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const { user, logout } = useContext(AuthContext);
  return (
    <div style={{ minHeight: "100vh" }}>
      <PageLayout>
        <Header />
        <div className="details">{user?.email}</div>
        <div>
          {loading ? (
            <div>Loading ..... </div>
          ) : (
            users.map((user) => <p key={user.email}>{user.email}</p>)
          )}
        </div>
        {error && <div>{error}</div>}
        <div>
          <Link to={"/products"}>Products</Link>
        </div>
        <Button
          style={{ backgroundColor: "black", color: "white" }}
          text={"Logout"}
          onClick={onLogout}
        />
      </PageLayout>
    </div>
  );
};

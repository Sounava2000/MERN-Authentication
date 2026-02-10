import React, { useContext, useState } from "react";
import { Context } from "../main.jsx";
import { Navigate } from "react-router-dom";
import { Register } from "../components/Register.jsx";
import { Login } from "../components/Login.jsx";
import "./Auth.css";

export const Auth = () => {
  const { isAuthenticated } = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
      <div className="auth-tabs">
  <button
    className={`auth-tab ${isLogin ? "active" : ""}`}
    onClick={() => setIsLogin(true)}
  >
    Login
  </button>

  <button
    className={`auth-tab ${!isLogin ? "active" : ""}`}
    onClick={() => setIsLogin(false)}
  >
    Register
  </button>
</div>


        <div className="auth-content">
         {isLogin ? (
    <Login setIsLogin={setIsLogin} />
  ) : (
    <Register setIsLogin={setIsLogin} />
  )}
        </div>
      </div>
    </div>
  );
};

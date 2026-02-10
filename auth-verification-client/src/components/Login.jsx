import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";

export const Login = ({ setIsLogin }) => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const navigate = useNavigate();
  const [form, setFrom] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  function handelChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFrom((prev) => {
      const copyCode = { ...prev };
      copyCode[name] = value;
      return copyCode;
    });
  }

  async function handelSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message); 
 localStorage.setItem("token", data.token);
           localStorage.setItem("user", JSON.stringify(data.name));

        setIsAuthenticated(true);
        setUser(data.user);
        navigate("/");
      }
      else {
        toast.error(data.message); 

      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Please login to your account</p>

        <form className="login-form" onSubmit={(e) => handelSubmit(e)}>
          <div className="input-group">
            <label style={{ color: "black" }}>Email</label>
            <input
              type="email"
              onChange={handelChange}
              name="email"
              value={form.email}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label style={{ color: "black" }}>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handelChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="forgot-password">
            <span>
              {" "}
              <Link to="/password/forget">Forgot password?</Link>;
            </span>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="footer-text">
          Don’t have an account?{" "}
          <span onClick={() => setIsLogin(false)}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

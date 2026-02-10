import React, { useContext, useState } from "react";
import "./ForgetPassword.css";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
const API_URL = import.meta.env.VITE_API_URL;

  const [loader, setLoader] = useState(false);
  async function handelSubmit(e) {
    setLoader(true);
    try {
      const res = await fetch(`${API_URL}/password/forget`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      const data = await res.json();
      console.log(data)
      if (data.success) {
        toast.success(data.message);
        
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  }

  return (
    <div className="forget-wrapper">
      <div className="forget-card">
        <h2>Forgot Password?</h2>

        <p className="forget-text">
          Enter your registered email address and we’ll send you a password
          reset link.
        </p>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={(e) => handelSubmit(e)}
          className={`forget-btn ${loader ? "active" : ""}`}
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

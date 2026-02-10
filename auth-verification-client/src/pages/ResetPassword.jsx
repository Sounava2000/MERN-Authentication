import React from "react";
import { useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Context } from "../main";
import { useState } from "react";
import { toast } from "react-toastify";
import "./ResetPassword.css";
export const ResetPassword = () => {
  const { token } = useParams();
   const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);
  const [password, setPassword] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const [confirmPassword, setConfirmPassword] = useState("");
  async function handleResetPassword(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_URL}/password/reset/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            confirmPassword,
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        console.log(data)
        toast.success(data.message);
        setIsAuthenticated(true);
        setUser(data.user);
            navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
   
  return (
    <div className="reset-page">
      <div className="reset-card">
        <h2>Reset Your Password</h2>
        <p className="reset-subtitle">
          Please enter and confirm your new password
        </p>

        <form className="reset-form" onSubmit={handleResetPassword}>
          <div className="input-group">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="reset-btn">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

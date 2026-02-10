import React, { useEffect, useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [loader, setLoader] = useState(false);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    verificationMethod: "email",
  });
  function handelChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    setRegister((prev) => {
      const copyCode = { ...prev };
      copyCode[name] = value;
      return copyCode;
    });
  }
  useEffect(() => {
    console.log(register);
  }, [register]);

  async function handelSubmit(e) {
    e.preventDefault();
    setLoader(true);

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(register),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setLoader(false);
        toast.success(data.message);

        navigate(`/otp-verify/${register.email}/${register.phone}`);
      } else {
        setLoader(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.message);
    }
  }
  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Create Account ✨</h2>
        <p className="subtitle">Sign up to get started</p>

        <form className="register-form" onSubmit={handelSubmit}>
          <div className="input-group">
            <label style={{color: "black"}} >Name</label>
            <input
              type="text"
              name="name"
              onChange={(e) => handelChange(e)}
              value={register.name}
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label style={{color: "black"}}>Email</label>
            <input
              type="email"
              value={register.email}
              onChange={(e) => handelChange(e)}
              name="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label style={{color: "black"}}>Phone</label>
            <input
              type="tel"
              value={register.phone}
              name="phone"
              onChange={(e) => handelChange(e)}
              placeholder="Enter phone number"
            />
          </div>

          <div className="input-group">
            <label style={{color: "black"}}>Password</label>
            <input
              type="password"
              value={register.password}
              name="password"
              onChange={(e) => handelChange(e)}
              placeholder="Create a password"
            />
          </div>

          <div className="input-group">
            <label style={{color: "black"}}>Verification Method</label>
            <select name="verificationMethod" disabled>
              <option value="email">Email</option>
            </select>
          </div>

          <button
            className={`register-btn ${loader ? "loading-register" : ""}`}
          >
            Register
          </button>
        </form>

        <p className="footer-text">
          Already have an account? <span>Login</span>
        </p>
      </div>
    </div>
  );
};

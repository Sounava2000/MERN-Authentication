import React, { useContext, useState } from "react";
import { Context } from "../main.jsx";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./OtpVerification.css";

export const OtpVerification = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const { email, phone } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/" />;

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;  
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    
    
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      toast.error("Please enter the 4-digit OTP");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/otp-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, otp: otpValue }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("OTP Verified Successfully!");
         localStorage.setItem("token", data.token);
           localStorage.setItem("user", JSON.stringify(data.firstUser.name));

        setIsAuthenticated(true);
        setUser(data.firstUser);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-card">
        <h2>OTP Verification</h2>
        <p className="otp-text">We’ve sent a 4-digit verification code to</p>
        <p className="otp-target">{email || phone}</p>

        <div className="otp-inputs">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>

        <button className="otp-btn" onClick={handleSubmit}>
          Verify OTP
        </button>

        <p className="resend-text">
          Didn’t receive the code? <span>Resend</span>
        </p>
      </div>
    </div>
  );
};

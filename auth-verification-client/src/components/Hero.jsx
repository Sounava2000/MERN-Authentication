import React, { useContext } from "react";
import "./Hero.css";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { user, setUser, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  // লোকাল স্টোরেজ থেকে ইউজার পেতে
  const localUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);

    navigate("/auth");
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <span className="welcome-badge">
          👋 Hello, {user?.name || localUser  || "Developer"}
        </span>

        <h1>
          Build Secure <span>MERN Authentication</span>
        </h1>

        <p>
          Learn complete authentication flow using MERN Stack with OTP
          verification, JWT, Twilio & Nodemailer in a clean and professional way.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate(localUser || user ? "/" : "/auth")}
          >
            {localUser || user ? "Demo Button" : "Sign In"}
          </button>

          {(localUser || user) && (
            <button className="secondary-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Context } from "./main.jsx";
import { Home } from "./pages/Home.jsx";
import { Auth } from "./pages/Auth.jsx";
import { OtpVerification } from "./pages/OtpVerification.jsx";
import { ForgetPassword } from "./pages/ForgetPassword.jsx";
import { ResetPassword } from "./pages/ResetPassword.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <>
      <Context.Provider
        value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/otp-verify/:email/:phone" element={<OtpVerification />} />
            <Route path="/password/forget" element={<ForgetPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
          </Routes>
          <ToastContainer theme="colored" />
        </BrowserRouter>
        ,
      </Context.Provider>
    </>
  );
}

export default App;

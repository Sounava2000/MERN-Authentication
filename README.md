MERN Authentication System

A secure MERN Stack Authentication System with OTP verification, JWT authentication, Twilio SMS, and Nodemailer email integration. Built with React, Node.js/Express, and MongoDB.

This project demonstrates a professional authentication flow with login, registration, password reset, and OTP verification features.

🔹 Features

User Registration & Login

OTP Verification (via email/phone)

JWT Authentication for secure sessions

Forgot Password & Reset Password Flow

Protected Routes in React

Logout Functionality

Responsive UI

🔹 Project Structure
mern-auth-system/
│
├─ auth-verification-client/       # React frontend
│   ├─ src/
│   ├─ public/
│   ├─ package.json
│   ├─ vite.config.js
│   └─ .env
│
├─ auth-verification-server/       # Node.js/Express backend
│   ├─ config/
│   ├─ controllers/
│   ├─ middlewares/
│   ├─ models/
│   ├─ routes/
│   ├─ schema/
│   ├─ services/
│   ├─ utils/
│   ├─ index.js
│   ├─ package.json
│   └─ .env
│
├─ Screenshot/                     # Screenshots of the app
│   ├─ home.PNG
│   ├─ login.PNG
│   ├─ register.PNG
│   ├─ password-forgot.PNG
│   └─ password-reset.PNG

🔹 Technologies Used

Frontend: React, React Router DOM, Vite, CSS

Backend: Node.js, Express.js, MongoDB, Mongoose

Authentication: JWT, OTP (Twilio, Nodemailer)

Notifications: react-toastify

Others: dotenv for environment variables

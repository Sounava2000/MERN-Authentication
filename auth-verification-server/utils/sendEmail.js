import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export const sendEmail = async (message, email,subject) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SHIP_HOST,
    port: process.env.SHIP_PORT,
    secure: false,
    auth: {
      user: process.env.SHIP_MAIL,
      pass: process.env.SHIP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SHIP_MAIL,
    to: email,
    subject: subject,
    html: message,
  });
};

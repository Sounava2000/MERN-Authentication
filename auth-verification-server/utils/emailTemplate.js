import nodemailer from "nodemailer";
export   function generateEmailTemplate(verificationCode,  name) {
  const message = `<body
    style="
      background: #f5f5f5;
      padding: 30px;
      font-family: Arial, sans-serif;
      color: #333;
    "
  >
    <div
      style="
        max-width: 500px;
        background: #ffffff;
        margin: auto;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 0 8px rgba(0,0,0,0.1);
      "
    >
      <h2 style="color: #4a4a4a; text-align: center;">Your Verification Code</h2>

      <p>Hello ${name},</p>
      <p>
        Thank you for registering. Your verification code is:
      </p>

      <div
        style="
          text-align: center;
          margin: 30px 0;
        "
      >
        <span
          style="
            font-size: 32px;
            letter-spacing: 8px;
            background: #f0f0f0;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: bold;
            display: inline-block;
          "
          >${verificationCode}</span
        >
      </div>

      <p>
        This code will expire in <strong>5 minutes</strong>.
      </p>

      <p style="margin-top:30px;">
        Regards,<br />
        <strong>Sounava Mukherjee</strong>
      </p>
    </div>
  </body>`;
  
  return message;
}

const nodemailer = require("nodemailer");

// returns an array of strings that contains a criteria not met by password
const strongPasswordValidation = (password) => {
  let passwordResult = [];

  if (password.length < 6) {
    passwordResult.push("Password must be at least 6 characters long.");
  }

  if (!/[A-Z]/.test(password)) {
    passwordResult.push("Password must contain an uppercase letter.");
  }

  if (!/[a-z]/.test(password)) {
    passwordResult.push("Password must contain a lowercase letter.");
  }

  if (!/\d/.test(password)) {
    passwordResult.push("Password must contain a number.");
  }

  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
    passwordResult.push("Password must contain a special character.");
  }

  return passwordResult;
};
// ************

// handle one-time-password generation
const handleOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};
// *******s

const OTPMessage = (otpCode) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email verification</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .container {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      text-align: center;
    }

    h1 {
      color: #333;
    }

    p {
      color: #666;
    }

    .otp-code {
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
      margin-top: 10px;
    }

    .note {
      color: #888;
      margin-top: 20px;
    }

    .footer {
      margin-top: 20px;
      color: #888;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>OTP Verification</h1>
    <p>Your One-Time Password (OTP) is:</p>
    <div class="otp-code">${otpCode}</div>
    <p class="note">This code is valid for a short period of time. Do not share it with others.</p>
    <div class="footer">
      <p>If you did not request this code, no further action is required.</p>
    </div>
     <p>Thank you,<br>Hire me Team</p>
  </div>
</body>
</html>
`;
};

// nodemailer email sender
const sendEmail = async (userEmail, code) => {
  // NOTE remember to change the email and password to a more secure one using env
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL_SENDER,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  let mailDetails = {
    from: process.env.GOOGLE_EMAIL_SENDER,
    to: userEmail,
    subject: "Verify email",
    html: OTPMessage(code),
  };

  await mailTransporter.sendMail(mailDetails);
};
// ************

module.exports = {
  sendEmail,
  handleOTP,
};

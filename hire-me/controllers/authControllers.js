const CustomError = require("../utils/customError"); // Import the custom error class
const UserModel = require("../model/userModel"); // Import the user model
const HTTPSTATUSCODE = require("../utils/httpStatusCodes"); // Import the HTTP status codes
const { generateJwtToken } = require("../utils/tokens"); // Import the function to generate JWT tokens
const validator = require("validator").default; // Import the validator library
const { sendEmail, handleOTP } = require("../utils/helper");

const signIn = async (req, res) => {
  // Extract the email and password from the request body
  const { email } = req.body;

  // Validate the input
  if (!email || !validator.isEmail(email)) {
    // If any of the checks fail, throw a custom error
    throw new CustomError(
      HTTPSTATUSCODE.BAD_REQUEST,
      "Please provide a valid email address"
    );
  }

  const code = handleOTP();
  console.log(code);

  const user = await UserModel.findOneAndUpdate(
    { email: email },
    {
      otp_code: code,
      email,
    },
    {
      upsert: true,
      new: true,
    }
  );
  // send email to user email
  sendEmail(email, code);

  console.log(user);

  // Send the response with the user's information and the access token
  res.status(200).json({ message: "Success" }); // Send the user's name, user ID, and the access token in the response body
};

const verifyEmail = async (req, res) => {
  const { otp_code } = req.body;
  console.log(otp_code);

  if (
    !otp_code // Check if otp code is provided
  ) {
    // If any of the checks fail, throw a custom error
    throw new CustomError(
      HTTPSTATUSCODE.BAD_REQUEST,
      "Please provide an otp_code"
    );
  }

  // check if the otp code is exactly what was sent
  const user = await UserModel.findOne({ otp_code: otp_code.trim() });
  console.log(user);

  if (!user) {
    // If a user with the same email exists, throw a custom error
    throw new CustomError(400, `Invalid code`);
  }

  user.otp_code = null;

  await user.save();

  // generate an access token for the user
  const accessToken = await generateJwtToken({
    user_id: user._id,
  });

  // Send the response with the user's information and the access token
  res
    .status(HTTPSTATUSCODE.OK) // Set the status code to 200 (OK)
    .json({ email: user.email, token: accessToken }); // Send the user's name, email, and the access token in the response body
};

module.exports = {
  signIn,
  verifyEmail,
};

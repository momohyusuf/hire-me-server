const CustomError = require("../utils/customError"); // Import the custom error class
const UserModel = require("../model/userModel"); // Import the user model
const HTTPSTATUSCODE = require("../utils/httpStatusCodes"); // Import the HTTP status codes

const validator = require("validator").default; // Import the validator library

const completeProfileSetup = async (req, res) => {
  const { user_id } = req.user;
  const {
    first_name,
    last_name,
    job_role,
    website_url,
    linkedin_url,
    profile_summary,
    profile_picture,
  } = req.body;
  // check if user provided firstName
  if (!first_name || first_name.trim().length < 3) {
    return res.status(400).json({ message: "Please provide your first name" });
  }

  // check if user provided firstName
  if (!last_name || last_name.trim().length < 3) {
    return res.status(400).json({ message: "Please provide your last name" });
  }
  // check if user age is less than 18
  if (!job_role || validator.isEmpty(job_role, { ignore_whitespace: true })) {
    return res.status(400).json({ message: "Please provide your job role" });
  }

  // check if an account with the email already exist
  const accountExist = await UserModel.findById(user_id);
  if (accountExist === null) {
    return res.status(400).json({ message: `Validation error` });
  }

  accountExist.first_name = first_name;
  accountExist.last_name = last_name;
  accountExist.job_role = job_role;
  accountExist.linkedin_url = linkedin_url;
  accountExist.website_url = website_url;
  accountExist.profile_picture = profile_picture;
  accountExist.profile_summary = profile_summary;

  await accountExist.save();

  // Send the response with the user's information and the access token
  res
    .status(HTTPSTATUSCODE.CREATED) // Set the status code to 201 (Created)
    .json({ message: "Setup complete", user: accountExist }); //
};

module.exports = {
  completeProfileSetup,
};

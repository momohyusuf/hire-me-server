// Require the Express module
const express = require("express");

// Require the necessary controllers for user authentication
const { signIn, verifyEmail } = require("../controllers/authControllers");

// Create an Express router
const router = express.Router();

// Define a route for user sign in
router.post(
  "/sign-in",
  // Call the signIn controller function to handle the sign-in request
  signIn
);

// Define a route for verifying the otp
router.post(
  "/verify-otp",
  // Call the signIn controller function to handle the sign-in request
  verifyEmail
);

// Export the router for use in other parts of the application
module.exports = router;

// In this code, we first require the Express module and the necessary controllers for user authentication. Then, we create an Express router and define routes for user sign up and sign in. Each route is configured to call the corresponding controller function when a request is received. Finally, we export the router to make it available for use in other parts of the application. Here's an explanation of the code:

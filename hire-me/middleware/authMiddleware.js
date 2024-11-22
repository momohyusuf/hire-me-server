const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../utils/httpStatusCodes");
const CustomError = require("../utils/customError");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// authenticate user login session
const authenticationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  //   step one check if token is provided
  if (!token) {
    throw new CustomError(
      HTTPSTATUSCODE.UNAUTHORIZED,
      "Not authorized: No token provided"
    );
  }

  //   step two verify jwt token
  const verifyToken = jwt.verify(token, JWT_SECRET);

  // check if user token is still valid
  if (!verifyToken) {
    throw new CustomError(
      HTTPSTATUSCODE.UNAUTHORIZED,
      "Not authorized: Invalid token or token has expired"
    );
  }

  //@ts-ignore
  req.user = verifyToken;
  next();
};

module.exports = {
  authenticationMiddleware,
};

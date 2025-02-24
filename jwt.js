const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuthMiddleware = (req, res, next) => {
  // extract the token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "un" });
  try {
    // verify the jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json("errors");
  }
};

const generateAuthMiddleware = (userdata) => {
  return jwt.sign(userdata, process.env.JWT_SECRET);
};

module.exports = { jwtAuthMiddleware, generateAuthMiddleware };

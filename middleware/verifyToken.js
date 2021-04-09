const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Token cant be empty",
    });
  }

  token = token.split("Bearer ")[1];

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: err.message,
      });
    }

    req.user = decode;

    return next();
  });
};

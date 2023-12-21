const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization, "SECRET", function (err, decode) {
      if (err) {
        req.user = null;
        req.message = "Invalid accessToken.";
        next();
      } else {
        req.user = decode;
        req.message = "User found successfully";
        next();
      }
    });
  } else {
    req.user = null;
    req.message = "Authorization header is needed";
    next();
  }
}

module.exports = verifyToken;

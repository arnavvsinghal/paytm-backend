const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({});
  }
  const userToken = authHeader.split(" ")[1];
  try {
    const verified = jwt.verify(userToken, JWT_SECRET);
    if (verified.userId) {
      req.userId = verified.userId;
      next();
    } else {
      res.status(403).json({});
    }
  } catch {
    res.status(403).json({});
  }
}

module.exports = authMiddleware;

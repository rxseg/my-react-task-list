const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  const decoded = jwt.verify(token, "roberttokencv");
  console.log(decoded.usuarios._id);
  req.headers._id = decoded.usuarios._id;
  next();
};

module.exports = verifyToken;

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) {
    return res.status(401).send({Message:"You are not allowed to access this page"});
  } else {
    try {
      const authorized = jwt.verify(token, "xxxxxxxxHSMSxxxxxxxx");
      req.user = authorized;
      next();
    } catch (error) {
      res.status(400).send({Message:"invalide token"});
    }
  }
};
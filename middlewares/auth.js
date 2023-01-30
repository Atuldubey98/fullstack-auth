const jwt = require("jsonwebtoken");
module.exports.auth = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.split(" ").length === 2
  ) {
    return res.status(403).json({ status: false, message: "Unauthorized" });
  }
  const [bearer, token] = req.headers.authorization.split(" ");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (bearer !== "Bearer") {
      return res.status(403).json({ status: false, message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ status: false, message: "Unauthorized" });
  }
};

module.exports.isAdmin = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.split(" ").length === 2
  ) {
    return res.status(403).json({ status: false, message: "Unauthorized" });
  }
  const [bearer, token] = req.headers.authorization.split(" ");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (bearer !== "Bearer" || decoded.role !== "ADMIN") {
      return res.status(403).json({ status: false, message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ status: false, message: "Unauthorized" });
  }
};

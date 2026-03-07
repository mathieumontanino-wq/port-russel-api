const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;

    next();

  } catch (error) {

    return res.status(401).json({ message: "Token invalide" });

  }

};
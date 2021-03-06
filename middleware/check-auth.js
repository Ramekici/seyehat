const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { 
      email: decodedToken.email,
      name: decodedToken.name,
      lastName: decodedToken.lastName,
      userId: decodedToken.userId }
    next();
  } catch(error) {
      return res.status(401).json({
        message: "Üyeliğiniz kabul edilmedi.(check-auth)"
    })
  }

}

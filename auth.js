const jwt = require("jsonwebtoken");

console.log(process.env.JWT);
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader;
    console.log("token:-", token);

    // jwt.verify(token, process.env.JWT, (err, user) => {
    //   if (err) res.status(403).json("Token is not valid!");
    //   req.user = user;
    //   next();
    // });
    if (token == process.env.JWT) {
      next();
    }
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
module.exports = { verifyToken };

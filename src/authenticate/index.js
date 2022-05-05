const jwt = require("jsonwebtoken");
let privateKey = process.env.JWT_SECRET_KEY || "secretKey";
let skipList = ["/media", "/avatar", "/video$"];

module.exports = function (req, res, next) {
  let token =
    req.body.token ||
    req.query.token ||
    req.header["x-access-token"] ||
    req.get("Authorization") ||
    req.query.token;
    if(req.get("Authorization")) {
      token = token.substring(7)
    }
  if (new RegExp(skipList.join("|")).test(req.originalUrl)) {
    req.decoded = {
      user_name: "unauthorized_user",
      company: "unknown_company",
    };
    next();
  } else {
    jwt.verify(token, privateKey, function (err, decoded) {
      if (err) {
        return res.status(401).send("Unauthorized");
      } else {
        req.auth = decoded;
        next();
      }
    });
  }
};

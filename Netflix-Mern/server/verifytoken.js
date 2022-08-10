const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authheader = req.headers.token;

  if (authheader) {
    const token = authheader.split(" ")[1];
    jwt.verify(token, process.env.SECRT_KEY, (err, user) => {
      if (err) {
        return res.status(401).json("Token not valid");
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
}

module.exports = verify;

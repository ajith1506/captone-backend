var jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      console.log(err); // bar
      (req.user = user), next();
    });
  }
};

const verifyUser = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are verified");
    }
  });
};

// VERIFY ADMIN
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
      console.log(res);
    } else {
      return next(createError(403, "You are not admin!"));
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };

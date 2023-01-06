// generate token using secret from process.env.JWT_SECRET
const jwt = require("jsonwebtoken");
const User = require("./models/User");

function generateToken(user) {
  if (!user) return null;

  let u = {
    userId: user.userId,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 12,
  });
}

// return basic user details
function getCleanUser(user) {
  if (!user) return null;

  return {
    userId: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };
}

function verifyToken(token, res, callback) {
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required.",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });
    User.findOne({ email: user.email }, function (err, user) {
      if (err) return res.send(err);
      callback(user);
    });
  });
}

module.exports = {
  generateToken,
  getCleanUser,
  verifyToken,
};

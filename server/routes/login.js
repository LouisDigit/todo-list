const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const utils = require("../utils");

router.get("/", (req, res) => {
  res.redirect("http://localhost:8080/");
});

router.post("/", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = utils.generateToken(user);
        const userObj = utils.getCleanUser(user);
        return res
          .status(201)
          .json({ message: "Login success", user: userObj, token });
      } else {
        res.status(401).send({ message: "Wrong credentials!" });
      }
    } else {
      res.send("User not found.");
    }
  });
});

module.exports = router;

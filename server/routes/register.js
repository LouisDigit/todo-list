const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.redirect("http://localhost:8080/");
});

router.post("/", (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email } = req.body;
  let password = req.body.password;
  console.log(firstname + " " + lastname + " " + email + " " + password);

  User.findOne({ email: email }, async (err, user) => {
    if (user) {
      res.send({ message: "user already exist" });
    } else {
      // Hashing password
      const saltRouds = 10;
      const salt = bcrypt.genSaltSync(saltRouds);
      const passwordHashed = bcrypt.hashSync(password, salt);
      password = passwordHashed;

      const user = new User({
        firstname,
        lastname,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "success" });
        }
      });
    }
  });
});

module.exports = router;

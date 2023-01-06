const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET all user
router.get("/", (req, res) => {
  User.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  });
});

module.exports = router;

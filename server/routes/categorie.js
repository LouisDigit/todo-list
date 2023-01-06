const express = require("express");
const router = express.Router();
const Categorie = require("../models/Categorie");

// GET all categories

router.get("/", (req, res) => {
  Categorie.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Categorie not found :" + err);
  });
});

// GET categorie by userId
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  Categorie.find({ userId: userId }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Categories of this user not found :" + err);
  });
});

// POST categorie
router.post("/", (req, res) => {
  const { value, userId } = req.body;
  const newCategorie = new Categorie({
    value: value,
    userId: userId,
  });

  newCategorie.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Categorie not create :" + err);
  });
});

// UPDATE categorie
router.put("/:id", (req, res) => {
  const { value } = req.body;
  const { id } = req.params;
  const updateCategorie = {
    value: value,
  };

  Categorie.findByIdAndUpdate(
    id,
    { $set: updateCategorie },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error :" + err);
    }
  );
});

// DELETE categorie by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Categorie.findByIdAndRemove(id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Categorie not delete :" + err);
  });
});

module.exports = router;

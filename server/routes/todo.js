const express = require("express");
const { capitalize } = require("vue");
const router = express.Router();
const Todo = require("../models/Todo");

// GET all todo
router.get("/", (req, res) => {
  Todo.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Todos not found :" + err);
  });
});

// GET todos done by userId
router.get("/done/:userId", (req, res) => {
  const { userId } = req.params;

  Todo.find(
    {
      userId: userId,
      status: "done",
    },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Todo done not found :" + err);
    }
  );
});
console.log("test");
// GET todo by userId
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  Todo.find({ userId: userId }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Todos of this user not found :" + err);
  });
});

// POST todo
router.post("/", (req, res) => {
  const { content, categorie, status, userId } = req.body;
  const newTodo = new Todo({
    content: content,
    categorie: categorie,
    status: status,
    userId: userId,
  });

  newTodo.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Todo not create :" + err);
  });
});

// UPDATE todo
router.put("/:id", (req, res) => {
  const { content, categorie, status } = req.body;
  const { id } = req.params;
  const updateTodo = {
    content: content,
    categorie: categorie,
    status: status,
  };

  Todo.findByIdAndUpdate(
    id,
    { $set: updateTodo },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error :" + err);
    }
  );
});

// DELETE todo by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndRemove(id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Todo not delete :" + err);
  });
});

module.exports = router;

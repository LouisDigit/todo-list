const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorieSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Categorie = mongoose.model("categorie", categorieSchema);

module.exports = Categorie;

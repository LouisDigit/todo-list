const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb://localhost:27017/todolist-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) console.log("Mongodb connected.");
    else console.log("Connection to database failed :" + err);
  }
);

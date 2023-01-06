const express = require("express");
const app = express();
require("./database/Connect");

app.listen(5000, () => console.log("Server started: 5000"));

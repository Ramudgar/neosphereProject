const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./config/db");

connectDB();

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});

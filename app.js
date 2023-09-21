const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./config/db");

const userRoutes = require("./Routes/userRoutes");

connectDB();

app.use(express.json());

app.use(userRoutes);


app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});

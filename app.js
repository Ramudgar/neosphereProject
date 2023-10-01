const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./config/db");

const userRoutes = require("./Routes/userRoutes");
const RegisterLoginRoutes = require("./Routes/RegisterLoginRoutes");
const profileRoutes = require("./Routes/profileRoutes");
connectDB();
app.use(express.json());

// make public folder static
app.use("/public", express.static(__dirname + "/public"));

app.use(userRoutes);
app.use(RegisterLoginRoutes);
app.use(profileRoutes);

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});

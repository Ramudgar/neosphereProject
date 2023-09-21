const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/user/savedata", (req, res) => {
  const data = req.body;

  console.log(data);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    role: data.role,
    contact: data.contact,
    age: data.age,
  });
  user
    .save()
    .then((data) => {
      res.json({ msg: "Data inserted", success: true, data });
    })
    .catch((error) => {
      res.status(500).json({ msg: error, success: false });
    });
});

module.exports = router;

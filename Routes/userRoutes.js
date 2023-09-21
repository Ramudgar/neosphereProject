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

// api using async await with try catch and proper error handling  using status codes and json
router.post("/user/savedataasync", async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({ msg: "Data not found", success: false });
  }
  try {
    const user = new User({
      name: data.name,
      email: data.email,
      role: data.role,
      contact: data.contact,
      age: data.age,
    });
    const savedUser = await user.save();
    res.json({ msg: "Data inserted", success: true, data: savedUser });
  } catch (e) {
    res.status(500).json({ msg: e.message, success: false });
  }
});

module.exports = router;

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
    res
      .status(201)
      .json({ msg: "Data inserted", success: true, data: savedUser });
  } catch (e) {
    res.status(500).json({ msg: e.message, success: false });
  }
});

// api to get all user data
router.get("/users/getdata", (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).json({ msg: "Data fetched", success: true, data });
    })
    .catch((error) => {
      res.status(500).json({ msg: error, success: false });
    });
});

// api to get all users using async and await
router.get("/user/getdata", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ msg: "data fetched successfully", success: true, users });
  } catch (err) {
    res.status(500).json({ msg: err.message, success: false });
  }
});

// api t Usero get user data by id
router.get("/users/getdata/:id", (req, res) => {
  User.findById(req.params.id)

    .then((data) => {
      res.json({ msg: "Data fetched", success: true, data });
    })
    .catch((error) => {
      res.status(500).json({ msg: error, success: false });
    });
});

module.exports = router;

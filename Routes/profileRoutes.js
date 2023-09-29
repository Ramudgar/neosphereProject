const express = require("express");
const router = express.Router();
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const auth = require("../config/auth");
const upload = require("../services/uploadServices");
const domain = require("http://localhost:3000/");

// api to save profile data
router.post(
  "/profile/savedata",
  auth.verifyUser,
  upload.profileImage.single("profile_pic"),
  (req, res) => {
    const data = req.body;
    console.log(data);
    console.log(req.file);
    const file = req.file;
    if (!file) {
      return res.status(400).json({ msg: "Please upload a file" });
    }
    const image = domain + "public/profiles/" + file.filename;
    const profile = new Profile({
      user: req.userData._id,
      name: data.name,
      contact: data.contact,
      age: data.age,
      profile_pic: image,
    });
    profile
      .save()
      .then((data) => {
        res.json({ msg: "Data inserted", success: true, data });
      })
      .catch((error) => {
        res.status(500).json({ msg: error, success: false });
      });
  }
);

module.exports = router;

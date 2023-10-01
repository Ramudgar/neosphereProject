const express = require("express");
const router = express.Router();
const Profile = require("../models/profileModel");
const domain = "http://localhost:5000/";
const auth = require("../config/auth");
const upload = require("../services/uploadServices");

// @route POST profile/create by taking the ref of the user
// @desc Create a profile
// @access Private
router.post(
  "/profile/create",
  upload.profileImage.single("profile_pic"),
  auth.verifyUser,
  async (req, res) => {
    const data = req.body;
    const file = req.file;

    try {
      const existingProfile = await Profile.findOne({ user: req.userData._id });

      if (existingProfile) {
        return res.status(400).json({ error: "Profile already exists" });
      }

      if (!file) {
        return res.status(400).json({ error: "Please upload an image" });
      }

      const image = domain + "public/profiles/" + file.filename;

      const profiledata = new Profile({
        user: req.userData._id,
        name: data.name,
        contact: data.contact,
        address: data.address,
        profile_pic: image,
      });

      await profiledata.save();

      return res.status(200).json({
        msg: "Profile created successfully",
        profiledata,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server Error" });
    }
  }
);

// code for get the profile by taking the ref of the user
// @route GET profile/get
// @desc Get a profile
// @access Private
router.get("/profile/get", auth.verifyUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userData._id });
    if (!profile) {
      return res.status(400).send("Profile not found");
    }
    res.json({ msg: "profile fetched", success: true, profile });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});




module.exports = router;

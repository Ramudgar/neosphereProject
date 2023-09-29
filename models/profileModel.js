const mongoose = require("mongoose");
const schema = mongoose.Schema;
const profileSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    contact: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
    profile_pic: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);

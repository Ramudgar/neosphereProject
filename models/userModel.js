const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      maxlength: [50, "Email cannot be more than 50 characters"],
    },

    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);

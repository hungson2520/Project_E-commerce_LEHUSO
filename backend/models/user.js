const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 3000,
    },
    isAdmin: { type: Boolean, default: false },
    image: { type: Object },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
exports.User = User;

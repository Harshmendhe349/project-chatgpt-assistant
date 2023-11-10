const mongoose = require("mongoose");

require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, minlength: 3, maxlength: 30 },
    last_name: { type: String, required: true, minlength: 3, maxlength: 30 },
    company_name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    password: { type: String, required: true,  minlength: 3, maxlength: 1024 },
    isVerified:{type: Boolean, default:false },
    emailToken:{type:String},
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

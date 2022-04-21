const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("Imvalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "The must at least be 6 characters long"],
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw Error("Password can not contain word 'password' ");
      }
    },
  },
  age: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw Error("age must be positive");
      }
    },
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;

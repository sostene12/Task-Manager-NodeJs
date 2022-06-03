const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Task = require("../models/taskModel");

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
    unique: true,
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  avatar: {
    type: Buffer,
  },
});

// Relationship
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// public data to be sent to the user and what is not going to be sent
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

// generating token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisisjsonwebtoken");

  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  return token;
};
// getting credentilas when logging in
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Unable to find user");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login! Wrong password");
  }
  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// delete user tasks when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

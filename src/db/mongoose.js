const mongoose = require("mongoose");
const validator = require("validator");
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});
// creating model of user
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, "password must not be less than 6 characters"],
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can not contain word 'password' ");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive number");
      }
    },
  },
});
// const me = new User({
//   name: "caleb",
//   email: "calebmugisha@gmail.com",
//   age: 25,
//   password: "ngso@#12",
// });
// me.save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log("Error!!", error);
//   });

// Create model for task
const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: false,
  },
  completed: {
    type: Boolean,
    default: true,
  },
});

const task = new Task({
  description: "          get prepared for praying",
})
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

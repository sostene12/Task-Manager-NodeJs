const mongoose = require("mongoose");
const validator = require("validator");

const schema = mongoose.Schema;

const taskSchema = new schema({
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

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

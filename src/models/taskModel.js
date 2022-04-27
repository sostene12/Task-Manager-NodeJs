const mongoose = require("mongoose");

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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

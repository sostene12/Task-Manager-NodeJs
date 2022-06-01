const express = require("express");
const Task = require("../models/taskModel");
const authMiddleware = require("../middlewares/Auth");
const router = express.Router();

// create task
router.post("/", authMiddleware, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

// get all tasks
router.get("/", authMiddleware, async (req, res) => {
  const match = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  try {
    // const tasks = await Task.find({ owner: req.user._id });
    // res.send(tasks);
    // same as below

    await req.user.populate({
      path: "tasks",
      match,
    });
    res.send(req.user.tasks);
  } catch (error) {
    res.send(error);
  }
});

// get task by id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update Task
router.patch("/:id", authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(404).send({ error: "Invalid updates!" });
  }

  try {
    // in other to acknowledge middlewares before save
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

// Delete task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;

const express = require("express");
const { status } = require("express/lib/response");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Task = require("./models/taskModel");
const { count } = require("./models/userModel");

const app = express();

const port = process.env.PORT || 3000;

// access the incomming json
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("The connection is complete");
    app.listen(port, () => {
      console.log(`The server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// create user
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// getting all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
// getting user by id
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// create task
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});
// update
// User.findByIdAndUpdate("625d727b9aa1b961b091c2ea", { age: 15 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 15 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const updateAgeAndCount = async (id, age, name) => {
//   const user = await User.findByIdAndUpdate(id, { age: age, name: name });
//   const count = await User.countDocuments({ age: age });

//   return { user, count };
// };
// updateAgeAndCount("625dbc25a3c278eadf27d435", 23, "pacifique")
//   .then(({ user, count }) => {
//     console.log(user);
//     console.log(count);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});

// get task by id
app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update
// Task.findByIdAndDelete("625d7620b9b25978d93b62fd")
//   .then((task) => {
//     return Task.countDocuments({ completed: false });
//   })
//   .then((completed) => {
//     console.log(completed);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const deleteTaskAndCount = async (id, completed) => {
//   await Task.findByIdAndDelete(id);
//   const count = await Task.countDocuments({ completed: completed });
//   return count;
// };

// deleteTaskAndCount("625dc3dfe0f52ae0bf041f5c", false)
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

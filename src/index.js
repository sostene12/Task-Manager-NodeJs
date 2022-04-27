const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/UsersRoutes");
const tasksRoutes = require("./routes/TasksRoutes");

const app = express();

const port = process.env.PORT || 3000;

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

// access the incomming json
app.use(express.json());

app.use("/users", userRoutes);
app.use("/tasks", tasksRoutes);

const Task = require("./models/taskModel");
const User = require("./models/userModel");

const main = async () => {
  // const task = await Task.findById("6263ad26979c9615c5b4668d");
  // await task.populate("owner", []);
  // console.log(task.owner);
  // const user = await User.findById("6263aca08c161982cfbabfc0");
  // await user.populate("tasks", []);
  // console.log(user.tasks);
};
main();

const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/UsersRoutes");
const tasksRoutes = require("./routes/TasksRoutes");

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

app.use("/users", userRoutes);
app.use("/tasks", tasksRoutes);

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "sos12345" }, "this is my jwt token", {
    expiresIn: "2 days",
  });
  console.log(token);
  const match = jwt.verify(token, "this is my jwt token");
  console.log(match);
};
myFunction();

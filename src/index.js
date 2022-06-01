const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/UsersRoutes");
const tasksRoutes = require("./routes/TasksRoutes");

const app = express();

const port = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://sostene:CaGUc402jkLlf1LJ@cluster0.tvlir.mongodb.net/task-manager-api?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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

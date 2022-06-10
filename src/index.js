const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/UsersRoutes");
const tasksRoutes = require("./routes/TasksRoutes");

const app = express();
dotenv.config();

const port = process.env.PORT;
mongoose
  .connect(
    process.env.MONGODB_URL,
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
    console.log({"error":error.message});
  });

// access the incomming json
app.use(express.json());

app.use("/users", userRoutes);
app.use("/tasks", tasksRoutes);

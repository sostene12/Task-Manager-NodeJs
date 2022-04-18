const express = require("express");
const { status } = require("express/lib/response");
const mongoose = require("mongoose");
const User = require("./models/userModel");

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

app.get("/", (req, res) => {
  res.json({ try: "This is the trial" });
});

app.post("/users", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
  });
  user
    .save()
    .then((user) => {
      console.log(user);
      res.send(user);
      //   res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: error.message });
    });
});

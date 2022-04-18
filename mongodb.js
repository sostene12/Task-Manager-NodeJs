// CRUD
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

const { ObjectId, MongoClient } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectId().toString();

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to the Database");
    }

    const db = client.db(databaseName);
    // db.collection("users").findOne(
    //   { _id: new ObjectId("625c3e8dde4f1ae74c63af75") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("User doesn't found");
    //     }
    //     console.log(user);
    //   }
    // );
    // db.collection("users").deleteMany({ age: 20 }, (error, user) => {
    //   if (error) {
    //     console.log("Unable to delete that item");
    //   }
    //   console.log(user);
    // });
    // db.collection("users")
    //   .find({ age: 37 })
    //   .toArray((error, users) => {
    //     if (error) {
    //       return console.log("Unable to find users");
    //     }
    //     console.log(users);
    //   });
    // db.collection("users")
    //   .find({ age: 37 })
    //   .count((error, count) => {
    //     if (error) {
    //       return console.log("Unable to find users");
    //     }
    //     console.log(count);
    //   });
    // db.collection("tasks").findOne(
    //   { _id: new ObjectId("625c4e218b8ad4b80c92768a") },
    //   (error, task) => {
    //     if (error) {
    //       return console.log("Unable to find that task");
    //     }
    //     console.log(task);
    //   }
    // );
    // db.collection("tasks")
    //   .find({ completed: true })
    //   .toArray((error, tasks) => {
    //     console.log(tasks);
    //   });
    // db.collection("tasks").updateMany(
    //   { completed: false },
    //   { $set: { completed: true } }
    // );
    // db.collection("users")
    //   .updateOne(
    //     { _id: new ObjectId("625c01fa7815d974e45c649c") },
    //     { $inc: { age: 1 } }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // db.collection("users")
    //   .deleteMany({ age: 37 })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    db.collection("tasks")
      .deleteOne({ description: "Take shower" })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

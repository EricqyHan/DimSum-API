const express = require("express");
const app = express();
const cors = require("cors");
const { MONGO_CLIENT_EVENTS } = require("mongodb");
const PORT = 8000;
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

app.use(cors());
app.use(express.json());

let dbConnectionStr = process.env.DB_String;

MongoClient.connect(dbConnectionStr)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("asian-food-api");
    const infoCollection = db.collection("dim-sum");

    app.get("/", (request, response) => {
      response.sendFile(__dirname + "/index.html");
    });

    app.get("/api/:foodNames", (request, response) => {
      const foodNames = request.params.foodNames.toLowerCase();
      infoCollection
        .find({ name: foodNames })
        .toArray()
        .then((results) => {
          console.log(results);
          response.json(results[0]);
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));

app.listen(process.env.PORT || PORT, () => {
  console.log("Server is running.");
});

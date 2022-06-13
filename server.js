const express = require("express");
const app = express();
const cors = require("cors");
const { MONGO_CLIENT_EVENTS } = require("mongodb");
const PORT = 8000;
const MongoClient = require("mongodb").MongoClient;
const connectionString = `mongodb+srv://eric123:5b3Zms1SXGFXT1qP@cluster0.kfs8mph.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

// const food = {
//   "shu mai": {
//     filling: "Pork, fish roe, green onion, dried shiitake",
//     wrapper: "wonton wrapper",
//     traditional_Name: "燒賣",
//     simplified_name: "烧卖",
//     image:
//       "https://tasteasianfood.com/wp-content/uploads/2017/01/sm8-feature.jpg",
//   },
//   "char siu bao": {
//     filling: "Pork",
//     wrapper: "yeast and baking powder",
//     traditional_Name: "叉燒包",
//     simplified_name: "叉烧包",
//     image: "https://rasamalaysia.com/images/char-siew-bao/charsiewbao_1.jpg",
//   },
//   "shrimp dumplings": {
//     filling: "shrimp",
//     wrapper: "wheat starch and potato starch",
//     traditional_Name: "蝦餃",
//     simplified_name: "虾饺",
//     image:
//       "https://i.pinimg.com/originals/dc/49/0a/dc490ae82680210fb03e6658fc9f3904.jpg",
//   },
//   "egg tart": {
//     filling: "custard, egg, and sugar",
//     wrapper: "Flour, butter, sugar",
//     traditional_Name: "蛋撻",
//     simplified_name: "蛋挞",
//     image:
//       "https://vignette.wikia.nocookie.net/dimsum/images/0/0b/Egg_custard_tart.jpg/revision/latest/scale-to-width-down/2000?cb=20150514195453",
//   },
//   rice: {
//     filling: "white rice",
//     image:
//       "https://dailylaboratories.com/wp-content/uploads/2017/03/stockvault-boiled-rice167192.jpg",
//   },
// };

MongoClient.connect(connectionString)
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

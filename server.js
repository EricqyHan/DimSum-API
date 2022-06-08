const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;

app.use(cors());

const food = {
  "shu mai": {
    filling: "Pork, fish roe, green onion, dried shiitake",
    wrapper: "wonton wrapper",
    traditional_Name: "燒賣",
    simplified_name: "烧卖",
    image:
      "https://tasteasianfood.com/wp-content/uploads/2017/01/sm8-feature.jpg",
  },
  "char siu bao": {
    filling: "Pork",
    wrapper: "yeast and baking powder",
    traditional_Name: "	叉燒包",
    simplified_name: "叉烧包",
    image:
      "https://en.wikipedia.org/wiki/Cha_siu_bao#/media/File:Char_siu_bao.jpg",
  },
  rice: {
    filling: "white rice",
    image:
      "https://dailylaboratories.com/wp-content/uploads/2017/03/stockvault-boiled-rice167192.jpg",
  },
};

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/api/:foodNames", (request, response) => {
  const foodNames = request.params.foodNames.toLowerCase();
  if (food[foodNames]) {
    response.json(food[foodNames]);
  } else {
    response.json(food["rice"]);
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Server is running.");
});

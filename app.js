require("dotenv").config();
const express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
const cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

const database = require("./utils/database");

const profile_route = require("./routes/profile");
const shop_route = require("./routes/shop");

const ecommerce_route = require("./routes/ecommerce/user.routes");

app.use(express.json());

app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));
app.get("/", (req, res) => {
  // res.send("Hello NODE API");

  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

app.get("/blog", (req, res) => {
  res.send(
    `<h1 style="color:red;">Hello Blog, My name is <br> LiveWithCodeAnkit</h1>`
  );
});

app.use("/api/shop", shop_route);

app.use("/api/profile", profile_route);

//ecom

app.use("/api/ecom", ecommerce_route);

//

const start = async () => {
  try {
    app.listen(port);
    await database.connect();
    console.log(`Server Is Runing On ${port}`);
  } catch (error) {
    console.log(error);
  }
};
start();

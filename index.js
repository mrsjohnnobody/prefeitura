require('dotenv').config()
const express = require("express");

require("./db/conn");

var cookieSession = require("cookie-session");
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cookieSession({
    name: "session",
    secret: "c293x8b6234z82n938246bc2938x4zb234",
    maxAge: 12 * 60 * 60 * 1000, // 12 hours
  })
);

app.use(express.static("public"));
app.use("/script", express.static('script'))
app.use("/styles", express.static('styles'))
app.use("/uploads", express.static("uploads"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");
app.set("views", "./views");

const routes = require('./routes');

routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


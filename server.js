require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const expressLayout = require("express-Ejs-layouts");
const app = express();
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
var MongoDBStore = require("connect-mongodb-session")(session);
const PORT = process.env.PORT || 3000;

// Database Connection
const MONGO_URL =
  "mongodb+srv://santosh2:admin2@apicluster.qw8yl.mongodb.net/onlineStore?retryWrites=true&w=majority";
mongoose.connect(MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

var store = new MongoDBStore({
  uri: MONGO_URL,
  collection: "mySessions",
});

// session config
app.use(
  session({
    secret: process.env.cookies,
    resave: false,
    store: store,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

// passport config
const passportInit = require("./app/config/Passport");
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())



// Catch errors
store.on("error", function (error) {
  console.log(error);
});

app.use(flash());
//assets

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//global middlewares
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user =req.user
  next();
});
//set Template Engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//Routes
require("./routes/web")(app);

app.listen(PORT, () => console.log(`server started at ${PORT}`));

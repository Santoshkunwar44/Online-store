const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-Ejs-layouts");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("home");
});

//set Template Engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.listen(PORT, () => console.log(`server started at ${PORT}`));

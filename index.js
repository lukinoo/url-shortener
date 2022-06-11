/**
 * @imports
 */
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const ShortUrl = require("./models/schema");

const app = require("liquid-express-views")(express());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// css file
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  res.render("index", {
    title: "URL shortener",
  });
});

app.post("/short-url", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullURl });

  res.redirect("/");
});

app.listen(process.env.PORT, () => {
  console.log(`server listening port ${process.env.PORT}`);
});

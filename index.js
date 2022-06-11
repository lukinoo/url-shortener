/**
 * @imports
 */
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = require("liquid-express-views")(express());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
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

app.listen(process.env.PORT, () => {
  console.log(`server listening port ${process.env.PORT}`);
});

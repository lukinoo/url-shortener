const express = require("express");
require("dotenv").config();

const app = require("liquid-express-views")(express());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// css file
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  res.render("index", {
    title: "URL shortener",
    fruits: ["Banana", "Orange", "Apple", "Mango"],
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server listening port ${process.env.PORT}`);
});

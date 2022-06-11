/**
 * @imports
 */
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const ShortUrl = require("./models/schema");
const rateLimit = require("express-rate-limit");

const app = require("liquid-express-views")(express());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// css file
app.use(express.static(__dirname + "/public"));

app.get("/", limiter, async (req, res) => {
  const short_urls = await ShortUrl.find();

  res.render("index", {
    title: "URL shortener",
    shortUrls: short_urls,
  });
});

app.post("/short-url", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullURl });

  res.redirect("/");
});

app.get("/:short_url", async (req, res) => {
  const short_url = await ShortUrl.findOne({ short: req.params.short_url });

  if (short_url == null) {
    res.render("404", { title: "404 error" });
    return;
  }

  res.redirect(short_url.full);
});

app.listen(process.env.PORT, () => {
  console.log(`server listening port ${process.env.PORT}`);
});

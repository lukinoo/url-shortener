const mongoose = require("mongoose");
const shortId = require("shortid");

const short_url_schema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  expire_at: {
    type: Date,
    default: Date.now(),
    expires: 60,
  },
});

module.exports = mongoose.model("ShortURL", short_url_schema);

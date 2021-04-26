const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  level: Number,
  roles: Array,
});

module.exports = model("ranks", schema);

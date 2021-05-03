const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  level: { type: Number, default: 0 },
  totalXP: { type: Number, default: 0 },
  currentXP: { type: Number, default: 0 },
});

module.exports = model("level", schema);

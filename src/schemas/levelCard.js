const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  background: { type: String, default: undefined },
  color: { type: String, default: undefined },
  opacity: { type: String, default: undefined }
});

module.exports = model("levelCard", schema);

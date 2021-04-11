const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const xpignoreSchema = new mongoose.Schema({
  // Guild ID
  guildId: reqString,
  channelId: [String],
});

module.exports = mongoose.model("xp-channel-ignore", xpignoreSchema);

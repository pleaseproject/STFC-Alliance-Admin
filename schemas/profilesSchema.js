const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const profilesSchema = mongoose.Schema({
  guildId: Number,
  userId: Number,
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("profiles", profilesSchema);

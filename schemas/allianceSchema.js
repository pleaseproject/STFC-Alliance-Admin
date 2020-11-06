const mongoose = require('mongoose');

const allianceSchema = mongoose.Schema({
    guildId: Number,
    allianceId: String,
    allianceStatus: [Object],
})
  
  module.exports = mongoose.model('alliancecommands', allianceSchema)
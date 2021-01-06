const mongoose = require('mongoose');

const customCommandSchema = mongoose.Schema({
    guildId: Number,
    commandName: String,
    commandResponse: String,
})
  
  module.exports = mongoose.model('customcommands', customCommandSchema)
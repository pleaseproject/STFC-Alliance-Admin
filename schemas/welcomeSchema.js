const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const welcomeSchema = mongoose.Schema({
    guildId: Number,
    channelId: Number,
})
  
  module.exports = mongoose.model('welcome', welcomeSchema)
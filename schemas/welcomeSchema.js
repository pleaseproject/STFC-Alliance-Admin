const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const profilesSchema = mongoose.Schema({
    guildId: Number,
    channelId: Number,
})
  
  module.exports = mongoose.model('welcome', welcomeSchema)
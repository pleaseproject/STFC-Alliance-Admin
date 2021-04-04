const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const scheduleSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    guildId: reqString,
    channelId: reqString,
    content: reqString,
})
  
  module.exports = mongoose.model('scheduled-messages', scheduleSchema)
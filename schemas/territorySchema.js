const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const territorySchema = mongoose.Schema({
    system: reqString,
    day: reqString,
    timeUTC: reqString,
    clocktype: reqString,
    duration: reqString,
    milTimeUTC: reqString
});
  
  module.exports = mongoose.model('territories', territorySchema)
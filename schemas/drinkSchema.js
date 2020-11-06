const mongoose = require('mongoose');

const drinkSchema = mongoose.Schema({
    _id: Number,
    drink: [Object],
})
  
  module.exports = mongoose.model('drinkcommands', drinkSchema)
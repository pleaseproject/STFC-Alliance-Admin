const mongoose = require('mongoose')
// const { mongoPath } = require('./config.json') // Will use to connect to mongo if needed
require('dotenv').config();

module.exports = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  return mongoose
}
require('dotenv').config()
const mongoose = require('mongoose')
const connection = mongoose.createConnection(process.env.MONGODB_URI)

module.exports = connection
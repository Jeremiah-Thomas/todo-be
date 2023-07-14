const mongoose = require('mongoose')
const connection = require('../db')

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = connection.model("User", user)

module.exports = User
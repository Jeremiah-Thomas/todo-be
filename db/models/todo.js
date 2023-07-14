const mongoose = require('mongoose')
const connection = require('../db')

const todo = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    links: {
        type: Array,
        required: false
    },
    user_email: {
        type: String,
        required: true
    }
})

const Todo = connection.model("Todo", todo)

module.exports = Todo
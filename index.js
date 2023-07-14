const express = require('express')
const cors = require('cors')

const authRouter = require('./routes/auth')
const todoRouter = require('./routes/todo')

app = express()

app.use(express.json)
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/todos', todoRouter)

app.listen(9001, () => {
    console.log('listening')
})
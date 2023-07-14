const express = require('express')
const auth = require('../middleware/jwt_verifiication')
const Todo = require('../db/models/todo')

const router = express.Router()

router.get('/', auth, (req, res) => {
    Todo.find({user_email: req.user.email}).then(todos => {
        res.json(todos)
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

router.get('/:id', auth, (req, res) => {
    Todo.find({user_email: req.user.email, _id : req.params.id}).then(todo => {
        res.json(todo)
}).catch(err => {
    console.log(err)
    res.sendStatus(400)
})
})

router.put('/:id', auth, (req, res) => {
    Todo.updateOne({user_email: req.user.email, _id: req.params.id}, req.body).then(todo => {
        res.json({message: "Product was updated"})
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.delete('/:id', auth, (req, res) => {
    Todo.deleteOne({user_email: req.body.email, _id: req.params.id}).then(todo => {
        res.json(todo)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

module.exports = router
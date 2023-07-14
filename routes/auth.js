const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require("../db/models/user")

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        constpasswordHash = await bcrypt.hash(req.body.password, 10)
        
        const user = await User.insertMany([
            {
                email: req.body.email.toLowerCase(),
                password: passwordHash
            }
        ])

        const token = jwt.sign(
            { user_id: user._id, email: req.body.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        user.token = token

        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
})

router.post('/login', async (req, res) => {

    try {

        const [user] = await User.find({email: req.body.email})

        

        if(user && (await bcrypt.compare(req.body.password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email: req.body.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )

            user.token = token
            // console.log(admin.token)
            res.status(200).json(user.token)
        }else{
            res.status(400).send('Invalid Credentials')
        }

    }catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

module.exports = router
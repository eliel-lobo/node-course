const express = require('express')
const router = express.Router()
const User = require('../db/models/user')

router.get('/users', async (req, res) => {

    try {
        const users = await User.find()
        res.send(users)
    } catch(e) {
        res.status(500).send(e.message)
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOne({_id: id})
        if (user) {
            res.send(user)
        } else {
            res.status(400).send({message: "User not found"})
        }
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "age", "password"]
    const invalidUpdates = updates.filter((key) => !allowedUpdates.includes(key))

    if (invalidUpdates.length > 0) {
        return res.status(400).send({
            message: 'Invalid operation, attempted to update unexisting fields: ' + invalidUpdates.join(',')
        })
    }

    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true})
        
        if (user) {
            res.send(user)
        } else {
            res.status(400).send({message: "User not found"})
        }
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

router.delete('/users/:id', async (req, res) => {

    try {
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)
        
        if (user) {
            res.send(user)
        } 

    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
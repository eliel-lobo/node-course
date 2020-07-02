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
        const user = await User.findById(id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        
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
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(401).send({ message: e.message})
    }
})

module.exports = router
const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const auth = require('../middleware/auth')

router.get('/users/me', auth, async (req, res) => {

    await req.user.populate('tasks').execPopulate()
    console.log(req.user)
    res.send(req.user)
    
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

router.post('/users/logout', auth, async (req, res) => {
    try {
        const user = req.user
        user.tokens = user.tokens.filter((t) => t.token !== req.token)

        await user.save()
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: e.message})
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        const user = req.user
        user.tokens = []

        await user.save()
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: e.message})
    }
})


router.patch('/users/me', auth, async (req, res) => {
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
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        
        res.send(user)
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

router.delete('/users/me', auth, async (req, res) => {

    try {
        const user = req.user
        
        await user.delete()
        res.status(204).send()

    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

module.exports = router
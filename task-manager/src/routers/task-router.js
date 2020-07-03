const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Task = require('../db/models/task')


router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const options = {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.offset),
        sort: {}
    }

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        options.sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try { 
        await req.user.populate({
            path: 'tasks',
            match,
            options
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

router.get('/tasks/:id', auth, async (req, res) => {
    try { 
        const _id = req.params.id
        const task = await Task.findOne({ _id, owner: req.user._id})
        if (task) {
            await task.populate('owner').execPopulate()
            res.send(task)
        } else {
            res.status(404).send({message: "Task not found"})
        }
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [ "description", "completed" ]
    const invalidUpdates = updates.filter((key) => !allowedUpdates.includes(key))

    if (invalidUpdates.length > 0) {
        return res.status(400).send({
            message: 'Invalid operation, attempted to update unexisting fields: ' + invalidUpdates.join(',')
        })
    }

    try {
        const _id = req.params.id
        const task = await Task.findOne({ _id, owner: req.user._id })
        
        if (!task) {
            return res.status(404).send({message: "Task not found"})
        }
        
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

router.delete('/tasks/:id', auth, async (req, res) => {

    try {
        const _id = req.params.id
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send({ message: 'Task not found'})
        }
        res.sendStatus(204)
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

module.exports = router
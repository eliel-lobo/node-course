const express = require('express')
const router = express.Router()
const Task = require('../db/models/task')


router.get('/tasks', async (req, res) => {

    try { 
        const tasks = await Task.find()
        res.send(tasks)
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

router.get('/tasks/:id', async (req, res) => {
    try { 
        const id = req.params.id
        const task = await Task.findOne({_id: id})
        if (task) {
            res.send(task)
        } else {
            res.status(400).send({message: "Task not found"})
        }
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

router.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [ "description", "completed" ]
    const invalidUpdates = updates.filter((key) => !allowedUpdates.includes(key))

    if (invalidUpdates.length > 0) {
        return res.status(400).send({
            message: 'Invalid operation, attempted to update unexisting fields: ' + invalidUpdates.join(',')
        })
    }

    try {
        const id = req.params.id
        const task = await Task.findById(id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        
        if (task) {
            res.send(task)
        } else {
            res.status(400).send({message: "Task not found"})
        }
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

router.delete('/tasks/:id', async (req, res) => {

    try {
        const id = req.params.id
        const task = await User.findByIdAndDelete(id)
        
        if (task) {
            res.send(task)
        } 
        
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

module.exports = router
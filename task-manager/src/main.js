const express = require('express')
require('./db/mongoose')
const User = require('./db/models/user')
const Task = require('./db/models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users', async (req, res) => {

    try {
        const users = await User.find()
        res.send(users)
    } catch(e) {
        res.status(500).send(e.message)
    }
})

app.get('/users/:id', async (req, res) => {
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

app.patch('/users/:id', async (req, res) => {
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

app.delete('/users/:id', async (req, res) => {

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

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


app.get('/tasks', async (req, res) => {

    try { 
        const tasks = await Task.find()
        res.send(tasks)
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

app.get('/tasks/:id', async (req, res) => {
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

app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

app.patch('/tasks/:id', async (req, res) => {
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
        const task = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true})
        
        if (task) {
            res.send(task)
        } else {
            res.status(400).send({message: "Task not found"})
        }
    } catch(e) {
        res.status(500).send({ message: e.message })
    } 
})

app.delete('/tasks/:id', async (req, res) => {

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


app.listen(port, () => {
    console.log('Listening on port ' + port)
})
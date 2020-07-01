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


app.listen(port, () => {
    console.log('Listening on port ' + port)
})
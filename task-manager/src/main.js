const express = require('express')
require('./db/mongoose')
const User = require('./db/models/user')
const Task = require('./db/models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users', (req, res) => {

    User.find().then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send(e.message)
    }) 
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    User.findOne({_id: id}).then((user) => {
        if (user) {
            res.send(user)
        } else {
            res.status(400).send({message: "User not found"})
        }
    }).catch((e) => {
        res.status(500).send({ message: e.message })
    }) 
})

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    }) 
})


app.get('/tasks', (req, res) => {

    Task.find().then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send({ message: e.message })
    }) 
})

app.get('/tasks/:id', (req, res) => {
    const id = req.params.id
    Task.findOne({_id: id}).then((task) => {
        if (task) {
            res.send(task)
        } else {
            res.status(400).send({message: "Task not found"})
        }
    }).catch((e) => {
        res.status(500).send({ message: e.message })
    }) 
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })  
})


app.listen(port, () => {
    console.log('Listening on port ' + port)
})
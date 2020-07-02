const express = require('express')
require('./db/mongoose')
const Task = require('./db/models/task')
const userRouter = require('./routers/user-router')
const taskRouter = require('./routers/task-router')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {

//     next()
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Listening on port ' + port)
})
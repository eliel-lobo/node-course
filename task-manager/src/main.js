const express = require('express')
require('./db/mongoose')
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

const Task = require('./db/models/task')
const User = require('./db/models/user')

const main = async () => {
    const user = await User.findById('5efe6fcc642fe8463c2f10ae')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
    console.log(user)
}

main()
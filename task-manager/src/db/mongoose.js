const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/task-db-manager', {
    useNewUrlParser: true,
    useCreateIndex: true
})
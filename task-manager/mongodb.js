const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const dbConnectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const taskToDelete = process.argv[2]

// This is a demonstration on the mongodb configuration. For this project we use mongoose which abstrachs much of this usage

MongoClient.connect(dbConnectionUrl, { useNewUrlParser: true }, (error, client) => {
    
    if (error) {
        console.log('Unabe to connet to database ')
        return console.log(error)
    }

    const db = client.db(databaseName)

    // db.collection('task').insertMany([ 
    //     { 
    //         description: 'Fix the kitchen appliances',
    //         completed: false
    //     }, { 
    //         description: 'Hang the curtains',
    //         completed: true
    //     }, { 
    //         description: 'Hang the bathroom mirror',
    //         completed: false
    //     }
    // ], (errorInsert, result) => {
    //     if (errorInsert) {
    //         return console.log('Unable to insert tasks: ' + errorInsert)
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('task').findOne((error, found) => {
    //     console.log(found)
    // })

    // db.collection('task').find({ completed: false }).toArray((error, found) => {
    //     console.log(found)
    // })

    // db.collection('task').updateMany({ 
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log('Success: ' + result)
    // }).catch((error) => {
    //     console.log('Error: ' + error)
    // })

    if (!taskToDelete) {
        return console.log('Error: task to delete was not provided')
    }

    db.collection('task').deleteOne({
        description: taskToDelete
    }).then(({result}) => {
        if(result.n === 1) {
            console.log('Task deleted: ' + taskToDelete)
        } else {
            console.log('No documets were deleted for task with descrition: ' + taskToDelete)
        }
        
    }).catch((error) => {
        console.log('Unable to delete task ' + taskToDelete + '. Error: ' + error)
    })

})
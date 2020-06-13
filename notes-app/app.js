const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./notes.js')
const { argv } = require('yargs')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder: {
        title: { 
            describe: 'The title for the note',
            demandOption: true,
            type: 'string'
        },
        body: { 
            describe: 'The content of the note',
            demandOption: true,
            type: 'string'
        }
    }, 
    handler: (argv) => notes.addNote(argv.title, argv.body)
})

yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: { 
            describe: 'The title of the note to delete',
            demandOption: true,
            type: 'string'
        }
    }, 
    handler: (argv) => notes.removeNote(argv.title)
})

yargs.command({
    command: 'read',
    describe: 'Displays a note',
    builder: {
        title: { 
            describe: 'The title of the note to display',
            demandOption: true,
            type: 'string'
        }
    },  
    handler: (argsv) => notes.readNote(argsv.title)
})

yargs.command({
    command: 'list',
    describe: 'Lists all the notes', 
    handler: () => notes.getNotes()
})

yargs.parse()




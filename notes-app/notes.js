const fs = require('fs')
const yargs = require('yargs')
const chalk = require('chalk')

const getNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold.green.green('Your notes:'))
    notes.forEach(note => console.log(chalk.grey('- ' + note.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const theNote = notes.find((note) => note.title === title)

    if (theNote !== undefined) {
        console.log(chalk.bold.green.green(theNote.title))
        console.log(theNote.body)
    } else {
        console.log(chalk.red('There is no note with title \"' + title + '\"'))
    }
    
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicatedNote = notes.find((note) => note.title === title)

    if (!duplicatedNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note saved!'))
    } else {
        console.log(chalk.red.inverse('Note wiht title \"' + title + '\" already exists'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter((note) => note.title !== title)
    if (notes.length > newNotes.length) {
        saveNotes(newNotes)
        console.log(chalk.green.inverse('Note removed!'))
    } else {
        console.log(chalk.red('Note with title \"' + title + '\" does not exist'))
    }
}

const loadNotes = () =>  {
    try {
        const buffer = fs.readFileSync('notes.json')
        const notesJson = buffer.toString()
        return JSON.parse(notesJson)
    } catch (e) {
        return [] 
    }
}

const saveNotes = (notes) => {
    const strNotes = JSON.stringify(notes)
    fs.writeFileSync('notes.json', strNotes)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}
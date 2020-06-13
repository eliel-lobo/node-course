const fs = require('fs')

const person = {
    name: 'Marvin',
    planet: 'Mars',
    age: 30
}

const personString = fs.readFileSync('1-json.json').toString()
const personJson = JSON.parse(personString)
personJson.name = person.name
personJson.planet = person.planet
personJson.age = person.age

fs.writeFileSync('1-json.json', JSON.stringify(personJson))
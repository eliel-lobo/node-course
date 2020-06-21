const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const searchText = process.argv[2]

const displayWeather = (error, {description, location, temperature}) => {
    if(error) {
        return console.log(error)
    } 

    console.log('Weather is ' + description + ' in ' + location + '. It is making ' + temperature + ' degrees outside.')
    
}

if (searchText) {
    geocode(searchText, (error, data) => {
        if (error) {
            return console.log(error)
        } 

        console.log(data)
        forecast(data, displayWeather)
        
    })
} else { 
    console.log('Pleanse provide a search')
}

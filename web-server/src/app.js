const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Setup constantst used by express and handlebars
const publicAssetsPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set handlebar properites
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup "public" as static folder for assets
app.use(express.static(publicAssetsPath))

app.get('', (req, res) => {
    res.render('index', 
    {
        title: 'Weather App',
        name: 'Eliel Lobo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Eliel Lobo'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        name: 'Eliel Lobo',
        message: 'Help page not found'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'How about...',
        name: 'Eliel Lobo'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
                error: "address was not provided and it is mandatory"
            }
        )
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        } 

        forecast(data, (forecastError, {location, temperature, description, wind_speed, humidity}) => {
            if (forecastError) {
                return res.send({error: forecastError})
            } 
            
            const forecastText = 'Weather is ' + description + ' in ' + location + '. It is making ' + temperature + 
                ' degrees outside with a wind speed of ' + wind_speed + 'kmph and a humidity of ' + humidity
            res.send({
                forecast: forecastText,
                location,
                address
            })
        })      
    })

    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        name: 'Eliel Lobo',
        message: 'Page not found'
    })
})

app.listen(port, (req, res) => {
    console.log('Server started at port port')
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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
    res.send('The weather')
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        name: 'Eliel Lobo',
        message: 'Page not found'
    })
})

app.listen(3000, (req, res) => {
    console.log('Server started at port 3000')
})
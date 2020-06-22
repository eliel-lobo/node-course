const request = require('postman-request')

const accessToken = 'e7836db253a09a4fafa6c1a74d19872d'
const baseUrl = 'http://api.weatherstack.com/'
const endpoint = 'current'

const forecast = ({ longitude, latitude, location }, callback) => {

    const url = baseUrl + endpoint + '?access_key=' + accessToken + '&query=' + latitude + ',' + longitude + '&units=m'

    // decomposed 3rd parameter in the callback (body) into its properties error and current
    request({ url: url, json: true} , function (error, response, {error:bodyError, current}) {
        
        if (error) {
            console.log(error)
            callback('Unable to connect to WeatherStack service', undefined)
        } else if (bodyError) { 
            console.log('statusCode:', response && response.statusCode);
            console.log('error:', bodyError);
            callback('There was an error getting weather data from WeatherStack')
        } else {
            if(current) {
                callback(undefined, 
                    {
                        temperature: current.temperature,
                        description: current.weather_descriptions[0],
                        location: location
                    })
            } else {
                callback('It wasn\'t possible to get the forecast for ' + geocode.location)
            }
        }
    })
}

module.exports = forecast

const request = require('postman-request')

const accessToken = 'pk.eyJ1IjoiZWxpZWxkYXZpZCIsImEiOiJja2JsaXp2aGIwbHhqMnlxbmxyMmlicjV4In0.EamaJkR88uLa8qTkIfVHhg';
const baseUrl = 'https://api.mapbox.com'


const geocode = (address, callback) => {

    const endpoint = '/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json'
    const url = baseUrl + endpoint + '?access_token=' + accessToken + '&limit=1'
    // deconstructed 3rd parameter 'body' into its properties 'error' and 'fearures'
    request({ url: url, json: true} , function (error, response, {error:bodyError, features}) {
        
        if (error) {
            callback('Unable to connect to mapbox service', undefined)
        } else if (bodyError) { 
            console.log('statusCode:', response && response.statusCode); 
            console.log('error:', bodyError); 
            callback('There was an error getting coordinates from mapbox', undefined)
        } else {
            if(features && features.length > 0) {
                callback(undefined, 
                {
                    latitude: features[0].center[1],
                    longitude: features[0].center[0],
                    location: features[0].place_name,
                })
            } else {
                console.log(url)
                callback('Unable to find location: ' + address + '. Try another search', undefined)
            }
        }
    })
}

module.exports = geocode
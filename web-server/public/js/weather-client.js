console.log('Scripts loaded')

const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = input.value
    message1.textContent = 'Loading...'
    message2.textContent = undefined

    fetch('/weather?address=' + location ).then((response) => {
        response.json().then(({error, location, forecast}) => {

            if (error) {
                message1.textContent = error
            } else {
                message1.textContent = location
                message2.textContent = forecast
            }
        })
    })
})
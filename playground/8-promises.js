const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([1,3,5]) // <-- only this will be executed
        reject('Error!')
    }, 2000)
})

doWorkPromise().then((result) => {
    console.log('Success: ' + result)
}).catch((error) => {
    console.log('Error: ' + error)
})
add(1, 4, (sum) => {
    console.log(sum)
})

function add(a, b, callback) {
    setTimeout(() => callback(a + b), 2000)
}
const name = 'Eliel'
const userAge = 20

const user = {
    name, // <-- creating a property with the same name and value thatn the variable that exists in the context
    age: userAge, // <-- creating a property 'age' into the object using the value of the existing variable
    location: 'Medellin'
}

console.log(user)

const product = {
    label: 'Red book',
    price: 3,
    stock: 201,
    salePrice: undefined
}

const {label:productLabel, stock, rating = 5, published} = product // <-- deconstructing object product into variables
console.log(productLabel) // <-- here product was renamed as productLabel
console.log(stock) // <-- this is straight forward deconstruction into a variable with the same name.
console.log(rating) // <-- there is no rating field in the product object so the default value 5 will be used
console.log(published) // <-- there is no published variable in product above, also no default value, so undefined will be used
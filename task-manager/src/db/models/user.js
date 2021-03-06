const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }, 
    email: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email provided ' + value)
            }
        }
    }, 
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot not contain the "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET, { expiresIn: '2 hours'})

    user.tokens = user.tokens.concat({token})
    await user.save()
    
    return token;
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject() // <-- TODO investigate what this toObject() does

    console.log(userObject)
    delete userObject.tokens
    delete userObject.password
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email })
    
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function() {
    await hashPassword(this)
})

userSchema.pre('remove', async function() {
    await Task.deleteMany({ owner: this._id })
})

const User = mongoose.model('User', userSchema)

async function hashPassword(user) {
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
}

module.exports = User
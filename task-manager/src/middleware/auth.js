const jwt = require('jsonwebtoken')
const User = require('../db/models/user')

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization missing')
        }
        console.log(req.headers.authorization)
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error('Invalid authorization token')
        }

        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ message: e.message})
    }
}

module.exports = auth
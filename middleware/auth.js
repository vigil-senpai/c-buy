const { createCustomError } = require('../error/custom-error')
const jwt = require('jsonwebtoken')
const AuthenticationError = require('../errors/authentication-error')

module.exports = async(req, res, next) => {
    const authorization = req.headers.authorization

    if(!authorization || !authorization.startsWith('Bearer ')) {
        throw new AuthenticationError('Credentials not valid')
    }
    
    const token = authorization.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        return next()
    }
    catch(err) {
        throw new AuthenticationError('Not Authorized to Perform the Action in this Route')
    }
}
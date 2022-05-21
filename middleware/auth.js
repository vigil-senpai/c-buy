const { createCustomError } = require('../error/custom-error')
const asyncWrapper = require('./async-wrapper')
const jwt = require('jsonwebtoken')

module.exports = asyncWrapper(async(req, res, next) => {
    const authorization = req.headers.authorization

    if(!authorization || !authorization.startsWith('Bearer ')) {
        return next(createCustomError('No Token Provided', 401))
    }
    
    const token = authorization.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        return next()
    }
    catch(err) {
        return next(createCustomError('Not Authorized to Perform the Action in this Route', 401))
    }
})
const jwt = require('jsonwebtoken')

const AuthenticationError = require('../errors/authentication-error')
const knexConfig = require('../knexconfig')
const queryPromise = require('../database/promise')

const knex = require('knex')(knexConfig.development)
module.exports = async(req, res, next) => {
    const authorization = req.headers.authorization

    if(!authorization || !authorization.startsWith('Bearer ')) {
        throw new AuthenticationError('Credentials not included')
    }
    
    const token = authorization.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {userID, storeID, passwordHash} = decoded
        if(userID) {
            const searchQuery = knex('MsUser').select('userID').where({userID: userID, passwordHash: passwordHash})
            const found = await queryPromise(searchQuery)
            if(!found[0]) {
                throw new AuthenticationError('Credentials not Valid')
            }
            req.body.user = {
                userID: userID,
                passwordHash: passwordHash
            }
        }
        else if(storeID) {
            const searchQuery = knex('MsStore').select('storeID').where({storeID: storeID, storePasswordHash: passwordHash})
            const found = await queryPromise(searchQuery)
            if(!found[0]) {
                throw new AuthenticationError('Credentials not Valid')
            }
            req.body.store = {
                storeID: storeID, 
                passwordHash: passwordHash
            }
        }
        return next()
    }
    catch(err) {
        const msg = err.message || 'Not Authorized to Perform the Action in this Route'
        throw new AuthenticationError(msg)
    }
}
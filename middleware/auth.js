const jwt = require('jsonwebtoken')
const AuthenticationError = require('../errors/authentication-error')

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
            req.body.user = {
                userID: userID,
                passwordHash: passwordHash
            }
        }
        else if(storeID) {
            req.body.store = {
                storeID: storeID, 
                passwordHash: passwordHash
            }
        }
        return next()
    }
    catch(err) {
        throw new AuthenticationError('Not Authorized to Perform the Action in this Route')
    }
}
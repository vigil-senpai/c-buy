const queryPromise = require('../database/promise')
const { NotFoundError, AuthenticationError } = require('../errors')
const {StatusCodes} = require('http-status-codes')
const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const getProducts = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const {userID} = req.body.user
    const query = knex('Cart').select('*').where({userID: userID})
    const result = await queryPromise(query)
    res.status(StatusCodes.OK).json({
        userID: userID, 
        usersProduct: result
    })
}

module.exports = {
    getProducts, 
}
const { StatusCodes } = require('http-status-codes')
const queryPromise = require('../database/promise')
const { AuthenticationError } = require('../errors')
const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)

const getProducts = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const {limit, offset, page} = req.body
    const query = knex('MsProduct').select('*').offset(offset).limit(limit)
    const result = queryPromise(query)
    return res.status(StatusCodes.OK).json({
        page: page, 
        count: limit, 
        products: result
    })
}

module.exports = {
    getProducts
}
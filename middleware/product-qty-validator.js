const knexConfig = require('../knexconfig')
const knex = require('knex')(knexConfig.development)
const queryPromise = require('../database/promise')
const { BadRequestError } = require('../errors')

module.exports  = async(req, res, next) => {
    const {productID, quantity} = req.body
    const getQtyQuery = knex('MsProduct').select('stocks').where({productID: productID})
    const result = await queryPromise(getQtyQuery)
    const productQty = result[0].stocks
    if(productQty < quantity) {
        throw new BadRequestError('Quantity is invalid (more than stocks)')
    }
    next() 
}
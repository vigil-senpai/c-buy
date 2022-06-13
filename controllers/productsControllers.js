const { StatusCodes } = require('http-status-codes')
const queryPromise = require('../database/promise')
const { AuthenticationError } = require('../errors')
const knexConfig = require('../knexconfig')
const generateId = require('../misc/generate-id')
const knex = require('knex')(knexConfig.development)

const getProducts = async(req, res, next) => {
    if(!req.body.user) {
        throw new AuthenticationError('No User Privilege')
    }
    const {limit, offset, page} = req.body
    const query = knex('MsProduct').select('*').offset(offset).limit(limit)
    const result = await queryPromise(query)
    return res.status(StatusCodes.OK).json({
        success: true, 
        page: page, 
        count: result.length, 
        products: result
    })
}

const postProduct = async(req, res, next) => {
    if(!req.body.store) {
        throw new AuthenticationError('No Store Privilege')
    }
    const {productName, price, category, stocks} = req.body
    const {storeID} = req.body.store
    const insertParam = {
        productID: generateId(), 
        productName: productName, 
        storeID: storeID,
        price: price, 
        category: category, 
        stocks: stocks
    }
    const query = knex('MsProduct').insert(insertParam)
    await queryPromise(query)
    return res.status(StatusCodes.CREATED).json({
        success: true, 
        product: insertParam
    })
}

module.exports = {
    getProducts, 
    postProduct
}